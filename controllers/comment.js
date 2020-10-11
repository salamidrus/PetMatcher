const { Comment } = require("../models/comment");

exports.GetAllComments = async (req, res, next) => {
  try {
    let data = await Comment.find();

    res.status(200).json({
      success: true,
      message: "Successfully retrieve comments!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Create = async (req, res, next) => {
  try {
    const { content, post } = req.body;
    const userId = req.userData._id;

    let data = await Comment.create({
      content: content,
      post: post,
      sender: userId,
    });

    res.status(201).json({
      success: true,
      message: "Successfully create a comment!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const comment = await Comment.findById(id);

    if (!comment)
      return next({ message: `There is no comment with _id:${id}` });

    // update inputs
    const { content, post } = req.body;
    let obj = {};

    if (content) obj.content = content;
    if (post) obj.post = post;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: obj },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Successfully update a comment!",
      data: updatedComment,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const comment = await Comment.findById(id);

    if (!comment)
      return next({ message: `There is no comment with _id:${id}` });

    await Comment.findByIdAndRemove(id, function (error, doc, result) {
      if (error) throw "Failed To delete ";
      if (!doc) {
        return res.status(400).json({ success: false, err: "Data not found" });
      }
      return res.status(200).json({ success: true, doc });
    });
  } catch (err) {
    next(err);
  }
};
