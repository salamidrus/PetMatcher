const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
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

const like = mongoose.model("Like", likeSchema);

exports.Like = like;