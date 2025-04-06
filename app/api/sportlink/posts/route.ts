import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Post, Athlete, Connection } from '@/lib/mongodb/models';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      userId,
      content,
      images,
      videos,
      documents,
      statistics,
      visibility,
      tags,
      sport,
      location
    } = body;
    
    if (!userId || !content) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }
    
    // Create new post
    const post = new Post({
      userId,
      content,
      images,
      videos,
      documents,
      statistics,
      visibility,
      tags,
      sport,
      location
    });
    
    await post.save();
    
    // Populate user data for response
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'name avatar position sport verified')
      .lean();
    
    return NextResponse.json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    let query: any = {};
    
    // If userId provided, get posts for specific user
    if (userId) {
      // Get user's connections
      const connections = await Connection.find({
        $or: [
          { requesterId: userId, status: 'accepted' },
          { recipientId: userId, status: 'accepted' }
        ]
      });
      
      const connectionIds = connections.map(c => 
        c.requesterId === userId ? c.recipientId : c.requesterId
      );
      
      // Include user's own posts and posts from connections
      query = {
        $or: [
          { userId },
          { 
            userId: { $in: connectionIds },
            visibility: { $in: ['public', 'connections'] }
          },
          { visibility: 'public' }
        ]
      };
    } else {
      // Only show public posts for non-authenticated requests
      query = { visibility: 'public' };
    }
    
    // Get posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name avatar position sport verified')
      .lean();
      
    const total = await Post.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    return NextResponse.json(
      { error: 'Failed to get posts' },
      { status: 500 }
    );
  }
}

// Handle post interactions (likes, comments)
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { postId, userId, action, data } = body;
    
    if (!postId || !userId || !action) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }
    
    let update: any = {};
    
    switch (action) {
      case 'like':
        update = { $addToSet: { likes: userId } };
        break;
        
      case 'unlike':
        update = { $pull: { likes: userId } };
        break;
        
      case 'comment':
        if (!data?.content) {
          return NextResponse.json(
            { error: 'Comment content required' },
            { status: 400 }
          );
        }
        update = { 
          $push: { 
            comments: {
              userId,
              content: data.content,
              createdAt: new Date()
            }
          }
        };
        break;
        
      case 'share':
        update = { $inc: { shares: 1 } };
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    ).populate('userId', 'name avatar position sport verified');
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
