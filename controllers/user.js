const { User } = require("../models/user");
const { decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

exports.GetAllUser = async (req, res, next) => {
  try {
    let data = await User.find();

    res.status(200).json({
      success: true,
      message: "Successfully retrieve users!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let data = await User.create({ email: email, password: password });

    res.status(201).json({
      success: true,
      message: "Successfully create a user!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return next({ message: `User with email:${email} is not found!` });
    }

    if (decryptPwd(password, user.password)) {
      const token = tokenGenerator(user);
      res.status(200).json({
        success: true,
        message: "Successfully logged in!",
        token: token,
      });
    } else {
      next({
        message: "Wrong Password!",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const user = await User.findById(id);

    if (!user) return next({ message: `There is no user with _id:${id}` });

    // update inputs
    const { email, fullName, mobileNumber, posts } = req.body;
    let obj = {};

    if (email) obj.email = email;
    if (fullName) obj.fullName = fullName;
    if (mobileNumber) obj.mobileNumber = mobileNumber;
    if (posts || Array.isArray(posts)) obj.posts = posts;

    if (req.file && req.file.fieldname && req.file.path)
      obj.profilePhoto = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: obj },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Successfully update a user!",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID params" });

    const user = await User.findById(id);

    if (!user) return next({ message: `There is no user with _id:${id}` });

    await User.findByIdAndRemove(id, function (error, doc, result) {
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
