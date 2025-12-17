import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
      index: true
    },

    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    shareToken: {
      type: String,
      unique: true,
      sparse: true
    },

    expiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Share", ShareSchema);
