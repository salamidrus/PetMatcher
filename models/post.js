const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    match: [
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      "Please input in email format, example: asmith@mactec.com or foo12@foo.edu or bob.smith@foo.tv ",
    ],
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  mobileNumber: {
    type: String,
    match: [
      /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
      "Please input in mobile number format, example:  (+44)(0)20-12341234 or 02012341234 or +44 (0) 1234-1234 ",
    ],
  },
  profilePhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/drovood07/image/upload/v1574847777/uploads/doctor_xp3dmi.png",
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const user = mongoose.model("User", userSchema);

exports.User = user;
