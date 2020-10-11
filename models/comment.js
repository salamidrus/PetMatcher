const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const comment = mongoose.model("Comment", commentSchema);

exports.Comment = comment;
