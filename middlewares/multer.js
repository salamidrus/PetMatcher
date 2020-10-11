const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "PetMatcher",
  allowedFormats: ["jpg", "jpeg", "png", "svg"],
  transformation: function (req, file, cb) {
    if (file.fieldname === "profilePhoto") {
      cb(
        undefined,
        (transformationConditional = [
          {
            width: 500,
            height: 500,
            crop: "fill",
            gravity: "face",
          },
        ])
      );
    } else {
      cb(
        undefined,
        (transformationConditional = [
          {
            crop: "fill",
          },
        ])
      );
    }
  },
  filename: function (req, files, cb) {
    cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
  },
});

const fileFilter = (req, file, cb) => {
  const supportedFiles = [".jpg", ".jpeg", ".png", ".svg"];
  var ext = path.extname(file.originalname);
  if (supportedFiles.indexOf(ext) < 0) {
    return cb({
      status: 400,
      message: `Please upload only support file types: ${supportedFiles.join(
        ", "
      )}`,
    });
  }
  cb(null, true);
};

var uploader = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = uploader;
