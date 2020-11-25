const { Meeting } = require("../models/meeting");
const { Post } = require("../models/post");
const { User } = require("../models/user");

exports.GetAllMeetings = async (req, res, next) => {
  try {
    let data = await Meeting.find();

    res.status(200).json({
      success: true,
      message: "Successfully retrieve meeting!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Create = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    let obj = new Meeting();
    obj.location = {};
    let locationKey = ["street", "city", "postalCode", "latitude", "longitude"];

    const { post } = req.body;

    if (!post)
      return res.status(400).json({
        success: false,
        message: "Please provide a post id!",
      });

    let meetingOwner = await Post.findById(post).select("postOwner");

    for (let key in req.body) {
      if (locationKey.indexOf(key) != -1) {
        obj.location[key] = req.body[key];
      } else {
        obj[key] = req.body[key];
      }
    }

    obj.requestOwner = userId;
    obj.meetingOwner = meetingOwner.postOwner;

    let data = await obj.save();

    let users = [userId, meetingOwner.postOwner];

    await User.updateMany(
      { _id: { $in: users } },
      { $push: { meetings: data._id } }
    );

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

    const meeting = await Meeting.findById(id);

    if (!meeting)
      return next({ message: `There is no meeting with _id:${id}` });

    // update inputs
    let locationKey = ["street", "city", "postalCode", "latitude", "longitude"];

    for (let key in req.body) {
      if (locationKey.indexOf(key) != -1) {
        meeting.location[key] = req.body[key];
      } else {
        meeting[key] = req.body[key];
      }
    }

    const updatedMeeting = await meeting.save();

    res.status(201).json({
      success: true,
      message: "Successfully update a meeting!",
      data: updatedMeeting,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const meeting = await Meeting.findById(id);

    if (!meeting)
      return next({ message: `There is no meeting with _id:${id}` });

    await Meeting.findByIdAndRemove(id, async function (error, doc, result) {
      if (error) throw "Failed To delete ";
      if (!doc) {
        return res.status(400).json({ success: false, err: "Data not found" });
      }
      await User.findByIdAndUpdate(meeting.requestOwner, {
        $pull: { meetings: id },
      });
      await User.findByIdAndUpdate(meeting.meetingOwner, {
        $pull: { meetings: id },
      });
      return res.status(200).json({ success: true, data: doc });
    });
  } catch (err) {
    next(err);
  }
};
