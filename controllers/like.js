const { Like } = require("../models/like");
const { User } = require("../models/user");
const { Post } = require("../models/post");

exports.like = async (req, res, next) => {
  const id = req.userData._id;

  const post = req.params.postId;

  let postFound = await Post.findById(post);

  if (!postFound) next({ status: 400, message: "Post is not found!" });

  let checkLiked = await Like.findOne({ user: id, post: post });

  if (checkLiked)
    return res
      .status(400)
      .json({ success: false, message: "You have liked this post!" });

  let data = await Like.create({ user: id, post: post });

  await User.findByIdAndUpdate(id, { $push: { likes: data._id } });
  await Post.findByIdAndUpdate(post, { $inc: { likeCount: 1 } });

  res.status(200).json({
    success: true,
    message: "Successfully like a post!",
  });
};

exports.unlike = async (req, res, next) => {
  const id = req.userData._id;

  const post = req.params.postId;

  let postFound = await Post.findById(post);

  if (!postFound) next({ status: 400, message: "Post is not found!" });

  let checkLiked = await Like.findOne({ user: id, post: post });

  if (!checkLiked)
    return res
      .status(400)
      .json({ success: false, message: "You haven't liked this post!" });

  await Like.deleteOne({ user: id, post: post });
  await User.findByIdAndUpdate(id, { $pull: { likes: checkLiked._id } });
  await Post.findByIdAndUpdate(post, { $inc: { likeCount: -1 } });

  res.status(200).json({
    success: true,
    message: "Successfully unlike a post!",
  });
};
