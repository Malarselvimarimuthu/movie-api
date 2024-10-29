import mongoose, { Schema, Document } from 'mongoose';

interface IFavorite extends Document {
  userId: string; // Optional if user-based favorite is needed
  movieId: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

const favoriteSchema = new Schema<IFavorite>({
  userId: { type: String, required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String }
});

export default mongoose.model<IFavorite>('Favorite', favoriteSchema);
