import mongoose, { Schema, Document, Model } from 'mongoose';

interface IConnectionModel extends Model<IConnection> {
  getMutualConnectionsCount(athleteId1: string, athleteId2: string): Promise<number>;
  areConnected(athleteId1: string, athleteId2: string): Promise<boolean>;
}

export interface IConnection extends Document {
  requesterId: string; // ID of athlete sending the request
  recipientId: string; // ID of athlete receiving the request
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  connectionType: 'athlete' | 'coach' | 'mentor' | 'organization';
  mutualConnections?: number;
  lastInteraction?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionSchema = new Schema<IConnection>(
  {
    requesterId: { 
      type: String, 
      required: true, 
      ref: 'Athlete' 
    },
    recipientId: { 
      type: String, 
      required: true, 
      ref: 'Athlete' 
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'blocked'],
      default: 'pending',
      required: true,
    },
    connectionType: {
      type: String,
      enum: ['athlete', 'coach', 'mentor', 'organization'],
      required: true,
    },
    mutualConnections: {
      type: Number,
      default: 0,
    },
    lastInteraction: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { 
    timestamps: true 
  }
);

// Ensure unique connections between users
ConnectionSchema.index(
  { requesterId: 1, recipientId: 1 }, 
  { unique: true }
);

// Create indexes for better query performance
ConnectionSchema.index({ status: 1 });
ConnectionSchema.index({ requesterId: 1, status: 1 });
ConnectionSchema.index({ recipientId: 1, status: 1 });

// Static method to get mutual connections count
ConnectionSchema.statics.getMutualConnectionsCount = async function(
  athleteId1: string,
  athleteId2: string
): Promise<number> {
  const athlete1Connections = await this.find({
    $or: [
      { requesterId: athleteId1, status: 'accepted' },
      { recipientId: athleteId1, status: 'accepted' }
    ]
  }).distinct('requesterId recipientId');

  const athlete2Connections = await this.find({
    $or: [
      { requesterId: athleteId2, status: 'accepted' },
      { recipientId: athleteId2, status: 'accepted' }
    ]
  }).distinct('requesterId recipientId');

  // Get intersection of connections
  const mutualConnections = athlete1Connections.filter((id: string) => 
    athlete2Connections.includes(id) && 
    id !== athleteId1 && 
    id !== athleteId2
  );

  return mutualConnections.length;
};

// Method to check if two athletes are connected
ConnectionSchema.statics.areConnected = async function(
  athleteId1: string,
  athleteId2: string
): Promise<boolean> {
  const connection = await this.findOne({
    $or: [
      { requesterId: athleteId1, recipientId: athleteId2 },
      { requesterId: athleteId2, recipientId: athleteId1 }
    ],
    status: 'accepted'
  });

  return !!connection;
};

export default (mongoose.models.Connection as IConnectionModel) || 
  mongoose.model<IConnection, IConnectionModel>('Connection', ConnectionSchema);
