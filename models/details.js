const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
 stid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
  },
});

const Student = mongoose.model("Student",detailSchema );
module.exports = Student;