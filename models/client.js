const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  email:{
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password:{
      type: String,
      trim: true,
      minlength: [7, 'Password should be a minimum of 7 characters'],
      required: [true, 'Password is required']
  },
  first_name:{
      type: String,
      trim: true,
      required: [true, 'First Name is required']
  },
  last_name:{
      type: String,
      trim: true,
      required: [true, 'Last Name is required']
  },
  date_of_birth: {
      type: Date,
      set: function(v) {
        return new Date(v.getFullYear(), v.getMonth(), v.getDate());
      }
  },
  gender: {
      type: String,
  },
  phone: {
      type: String,
      minlength: 10,
      maxlength: 10
  },
  is_logged_in: {
      type: Boolean,
      default: false
  }
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;