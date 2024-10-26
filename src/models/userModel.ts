import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: number;
}

const userSchema: Schema = new Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
