const { Meeting } = require("../models/meeting");
const { Post } = require("../models/post");
const { User } = require("../models/user");

exports.GetAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    let data = await Post.find()
      .populate("postOwner")
      .sort("createdAt")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

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
    const userId = req.userData._id;
    let obj = new Post();
    obj.location = {};
    let locationKey = ["street", "city", "postalCode", "latitude", "longitude"];

    for (let key in req.body) {
      if (locationKey.indexOf(key) != -1) {
        obj.location[key] = req.body[key];
      } else {
        obj[key] = req.body[key];
      }
    }

    if (req.file && req.file.fieldname && req.file.path)
      obj.image = req.file.path;

    obj.postOwner = userId;

    let data = await obj.save();

    await User.findByIdAndUpdate(userId, { $push: { posts: data._id } });

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
    let locationKey = ["street", "city", "postalCode", "latitude", "longitude"];

    for (let key in req.body) {
      if (locationKey.indexOf(key) != -1) {
        post.location[key] = req.body[key];
      } else {
        post[key] = req.body[key];
      }
    }

    if (req.file && req.file.fieldname && req.file.path)
      post.image = req.file.path;

    const updatedPost = await post.save();

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

    await Post.findByIdAndRemove(id, async function (error, doc, result) {
      if (error) throw "Failed To delete ";
      if (!doc) {
        return res.status(400).json({ success: false, err: "Data not found" });
      }
      let meetingId = await Meeting.find({
        $or: [
          { meetingOwner: post.postOwner },
          { requestOwner: post.postOwner },
        ],
      });

      let meetingMap = [];
      if (meetingId) meetingMap.map((el) => el._id);

      await User.findByIdAndUpdate(post.postOwner, { $pull: { posts: id } });
      await User.updateMany(
        { meetings: { $in: meetingMap } },
        { $pull: { meetings: { $in: meetingMap } } }
      );
      await Meeting.deleteMany({ _id: meetingMap });
      return res.status(200).json({ success: true, data: doc });
    });
  } catch (err) {
    next(err);
  }
};
