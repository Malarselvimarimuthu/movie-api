import mongoose, { Schema, Document } from 'mongoose';

interface IFeedback extends Document {
  userId: string;
  username: string;
  movieId: string;
  command: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
