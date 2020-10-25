const { Like } = require("../models/like");
const { User } = require("../models/user");
const { Post } = require("../models/post");

exports.like = async (req, res, next) => {
  const id = req.userData._id;

  const post = req.params.postId;

  let postFound = await Post.findById(post);

  if (!postFound) next({ status: 400, message: "Post is not found!" });

  let data = await Like.create({ user: id, post: post });

  await User.findByIdAndUpdate(id, { $push: { likes: data._id } });
  await Post.findByIdAndUpdate(post, { $inc: { likeCount: 1 } });

  res.status(200).json({
    success: true,
    message: "Successfully like a post!",
  });
};

exports.unlike = (req, res, next) => {};
