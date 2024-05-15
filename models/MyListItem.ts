// models/MyListItem.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface MyListItem extends Document {
  userId: string;
  contentId: string;
}

const myListItemSchema = new Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
});

export default mongoose.model<MyListItem>('MyListItem', myListItemSchema);
