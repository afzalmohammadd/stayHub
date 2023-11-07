import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    Name: string;
    Email: string;
    Phone: string;
    Password: string;
    block?: boolean;
  }
  
  const UserSchema = new Schema<IUser>(
    {
      Name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      Email: {
        type: String,
        required: true,
        unique:true,
        max: 50,
      },
      Phone: {
        type: String,
        required: false,
        unique:true
      },
      Password: {
        type: String,
        required: false,
        min: 5,
      },
      block: {
        type: Boolean,
      },
    },
    { timestamps: true }
  );
  
  const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
  
  export default User;