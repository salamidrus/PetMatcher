const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const comment = mongoose.model("Comment", commentSchema);

exports.Comment = comment;
