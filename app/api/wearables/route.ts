import { NextRequest, NextResponse } from 'next/server';
import WearableService, { DeviceConfig } from '@/lib/wearables';
import dbConnect from '@/lib/mongodb';
import { Athlete } from '@/lib/mongodb/models';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { athleteId, deviceConfig } = body;
    
    if (!athleteId || !deviceConfig) {
      return NextResponse.json(
        { error: 'Athlete ID and device configuration are required' },
        { status: 400 }
      );
    }

    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }

    // Connect the wearable device
    const connected = await WearableService.connectDevice(athleteId, deviceConfig);

    if (!connected) {
      return NextResponse.json(
        { error: 'Failed to connect device' },
        { status: 400 }
      );
    }

    // Update athlete's device info
    athlete.connectedDevices = athlete.connectedDevices || [];
    athlete.connectedDevices.push(deviceConfig);
    await athlete.save();

    return NextResponse.json({
      success: true,
      message: 'Device connected successfully'
    });
  } catch (error) {
    console.error('Error connecting wearable:', error);
    return NextResponse.json(
      { error: 'Failed to connect wearable device' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const athleteId = searchParams.get('athleteId');
    
    if (!athleteId) {
      return NextResponse.json(
        { error: 'Athlete ID is required' },
        { status: 400 }
      );
    }

    // Get wearable data
    const data = await WearableService.getData(athleteId);
    
    if (!data) {
      return NextResponse.json(
        { error: 'No wearable data found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting wearable data:', error);
    return NextResponse.json(
      { error: 'Failed to get wearable data' },
      { status: 500 }
    );
  }
}
