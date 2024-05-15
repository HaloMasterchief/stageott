// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: string[];
    dislikedGenres: string[];
  };
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

const userSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }],
  },
  watchHistory: [{
    contentId: { type: String, required: true },
    watchedOn: { type: Date, required: true },
    rating: { type: Number },
  }],
});

export default mongoose.model<User>('User', userSchema);
