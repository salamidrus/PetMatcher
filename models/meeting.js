const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  street: { type: String },
  city: { type: String },
  postalCode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

const meetingSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    location: locationSchema,
    message: { type: String },
    date: { type: Date },
    hour: { type: Date },
    requestOwner: { type: Schema.Types.ObjectId, ref: "User" },
    meetingOwner: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const meeting = mongoose.model("Meeting", meetingSchema);

exports.Meeting = meeting;
