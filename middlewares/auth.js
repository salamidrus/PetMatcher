const jwt = require("jsonwebtoken");
const { tokenVerifier } = require("../helpers/jwt");

exports.Authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Token is not found!",
    });
  } else {
    try {
      const decoded = tokenVerifier(token);

      req.userData = decoded;
      next();
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
