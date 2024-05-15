// models/Movie.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Movie extends Document {
  id: string;
  title: string;
  description: string;
  genres: string[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const movieSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
});

export default mongoose.model<Movie>('Movie', movieSchema);
