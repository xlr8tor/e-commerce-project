import mongoose, { Document } from "mongoose";
const { Schema } = mongoose;

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      min: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      max: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User: UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
