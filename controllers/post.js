const { Post } = require("../models/post");

exports.GetAllPosts = async (req, res, next) => {
  try {
    let data = await Post.find().populate("postOwner");

    res.status(200).json({
      success: true,
      message: "Successfully retrieve post!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Create = async (req, res, next) => {
  try {
    if (req.file && req.file.fieldname && req.file.path)
      req.body.image = req.file.path;

    req.body.postOwner = req.userData._id;

    let data = await Post.create(req.body);

    res.status(201).json({
      success: true,
      message: "Successfully create a post!",
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

    const post = await Post.findById(id);

    if (!post) return next({ message: `There is no post with _id:${id}` });

    // update inputs
    let obj = {};

    for (let key in req.body) {
      obj[key] = req.body[key];
    }

    if (req.file && req.file.fieldname && req.file.path)
      obj.image = req.file.path;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: obj },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Successfully update a post!",
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const post = await Post.findById(id);

    if (!post) return next({ message: `There is no post with _id:${id}` });

    await Post.findByIdAndRemove(id, function (error, doc, result) {
      if (error) throw "Failed To delete ";
      if (!doc) {
        return res.status(400).json({ success: false, err: "Data not found" });
      }
      return res.status(200).json({ success: true, data: doc });
    });
  } catch (err) {
    next(err);
  }
};
