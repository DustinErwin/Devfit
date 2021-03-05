const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  class_name: {
    type: String,
    trim: true,
    required: [true, "Class Name is required"],
  },
  day: {
    type: String,
    required: [true, "Day of class is required"],
  },
  start_time: {
    type: String,
    trim: true,
    required: [true, "Class start time is required"],
    match: [
      /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
      "Please select a valid time",
    ],
  },
  current_size: {
    type: Number,
    trim: true,
    required: true,
    default: 0,
  },
  max_size: {
    type: Number,
    trim: true,
    required: [true, "Max class size is required"],
    default: 10,
    min: 6,
    max: 16,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  roster: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  ],
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
