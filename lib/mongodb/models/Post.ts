import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  userId: string;
  content: string;
  images?: string[];
  videos?: string[];
  documents?: string[];
  statistics?: {
    type: string;
    data: any;
  };
  likes: string[]; // Array of user IDs who liked the post
  comments: Array<{
    userId: string;
    content: string;
    createdAt: Date;
  }>;
  shares: number;
  visibility: 'public' | 'connections' | 'private';
  tags?: string[];
  sport?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    userId: { type: String, required: true, ref: 'Athlete' },
    content: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    documents: [{ type: String }],
    statistics: {
      type: { type: String },
      data: Schema.Types.Mixed,
    },
    likes: [{ type: String, ref: 'Athlete' }],
    comments: [
      {
        userId: { type: String, required: true, ref: 'Athlete' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    shares: { type: Number, default: 0 },
    visibility: {
      type: String,
      enum: ['public', 'connections', 'private'],
      default: 'public',
    },
    tags: [{ type: String }],
    sport: { type: String },
    location: {
      city: String,
      state: String,
      country: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create indexes for better query performance
PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ sport: 1 });
PostSchema.index({ visibility: 1 });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
