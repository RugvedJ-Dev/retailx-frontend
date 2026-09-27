import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IThread extends Document {
  userId: Types.ObjectId;
  threadname: string;
  createdAt: Date;
  updatedAt: Date;
}

const ThreadSchema = new Schema<IThread>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    threadname: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Thread: Model<IThread> =
  mongoose.models.Thread ||
  mongoose.model<IThread>("Thread", ThreadSchema);

export default Thread;