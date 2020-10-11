const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  age: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  location: {
    type: String,
  },
  status: { type: Boolean, default: 1 },
  posts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  likes: { type: Number, default: 0 },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
  },
  postOwner: { type: Schema.Types.ObjectId, ref: "User" },
});

const post = mongoose.model("Post", postSchema);

exports.Post = post;
