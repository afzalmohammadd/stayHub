import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  Password: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      min: 5,
    },
  }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
