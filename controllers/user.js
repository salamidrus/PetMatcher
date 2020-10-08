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
    let data = await User.create(req.body);

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
      res.status(404).json({
        msg: "Password is wrong!",
      });
    }
  } catch (err) {
    next(err);
  }
};
