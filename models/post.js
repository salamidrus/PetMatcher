const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  street: { type: String },
  city: { type: String },
  postalCode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

const postSchema = new Schema(
  {
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
    breed: {
      type: String,
    },
    location: locationSchema,
    status: { type: Boolean, default: 1 },
    likeCount: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: "Likes" }],
    commentCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
    },
    postOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema);

exports.Post = post;
