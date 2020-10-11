const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const category = mongoose.model("Category", categorySchema);

exports.Category = category;
