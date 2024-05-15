// models/TVShow.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

export interface TVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: string[];
  episodes: Episode[];
}

const episodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
});

const tvShowSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  episodes: [episodeSchema],
});

export default mongoose.model<TVShow>('TVShow', tvShowSchema);
