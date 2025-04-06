import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Connection, Athlete } from '@/lib/mongodb/models';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      requesterId,
      recipientId,
      connectionType,
      notes
    } = body;
    
    if (!requesterId || !recipientId || !connectionType) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }
    
    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requesterId, recipientId },
        { requesterId: recipientId, recipientId: requesterId }
      ]
    });
    
    if (existingConnection) {
      return NextResponse.json(
        { error: 'Connection already exists' },
        { status: 400 }
      );
    }
    
    // Calculate mutual connections
    const mutualCount = await Connection.getMutualConnectionsCount(requesterId, recipientId);
    
    // Create connection request
    const connection = new Connection({
      requesterId,
      recipientId,
      connectionType,
      notes,
      mutualConnections: mutualCount
    });
    
    await connection.save();
    
    // Populate user data for response
    const populatedConnection = await Connection.findById(connection._id)
      .populate('requesterId', 'name avatar position sport verified')
      .populate('recipientId', 'name avatar position sport verified')
      .lean();
    
    return NextResponse.json({
      success: true,
      connection: populatedConnection
    });
  } catch (error) {
    console.error('Error creating connection:', error);
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    let query: any = {
      $or: [
        { requesterId: userId },
        { recipientId: userId }
      ]
    };
    
    if (status) {
      query.status = status;
    }
    
    // Get connections with pagination
    const connections = await Connection.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('requesterId', 'name avatar position sport verified')
      .populate('recipientId', 'name avatar position sport verified')
      .lean();
    
    const total = await Connection.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      connections,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting connections:', error);
    return NextResponse.json(
      { error: 'Failed to get connections' },
      { status: 500 }
    );
  }
}

// Handle connection status updates
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { connectionId, status, notes } = body;
    
    if (!connectionId || !status) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }
    
    // Validate status
    const validStatuses = ['accepted', 'declined', 'blocked'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Update connection
    const connection = await Connection.findByIdAndUpdate(
      connectionId,
      {
        status,
        ...(notes && { notes }),
        lastInteraction: new Date()
      },
      { new: true }
    )
    .populate('requesterId', 'name avatar position sport verified')
    .populate('recipientId', 'name avatar position sport verified');
    
    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      connection
    });
  } catch (error) {
    console.error('Error updating connection:', error);
    return NextResponse.json(
      { error: 'Failed to update connection' },
      { status: 500 }
    );
  }
}

// Get suggested connections
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { userId, limit = 5 } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Get user's current connections
    const userConnections = await Connection.find({
      $or: [
        { requesterId: userId, status: 'accepted' },
        { recipientId: userId, status: 'accepted' }
      ]
    });
    
    const connectedUserIds = userConnections.map(c => 
      c.requesterId === userId ? c.recipientId : c.requesterId
    );
    
    // Add user's own ID to exclude from suggestions
    connectedUserIds.push(userId);
    
    // Get user's profile for sport matching
    const user = await Athlete.findById(userId);
    
    // Find potential connections based on:
    // 1. Same primary sport
    // 2. Not already connected
    // 3. Has mutual connections
    const suggestedConnections = await Athlete.aggregate([
      {
        $match: {
          _id: { $nin: connectedUserIds },
          'sports.primary': user.sports.primary
        }
      },
      {
        $lookup: {
          from: 'connections',
          let: { athleteId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$status', 'accepted'] },
                    {
                      $or: [
                        { $in: ['$requesterId', connectedUserIds] },
                        { $in: ['$recipientId', connectedUserIds] }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: 'mutualConnections'
        }
      },
      {
        $addFields: {
          mutualConnectionsCount: { $size: '$mutualConnections' }
        }
      },
      {
        $sort: { mutualConnectionsCount: -1 }
      },
      {
        $limit: limit
      },
      {
        $project: {
          name: 1,
          avatar: 1,
          sports: 1,
          position: 1,
          mutualConnectionsCount: 1,
          verified: 1
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      suggestions: suggestedConnections
    });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}
