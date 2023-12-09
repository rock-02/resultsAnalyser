const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  usn: {
    type: String,
    required: [true, 'Please provide usn'],
    unique: true,
  },
  semester: {
    type: String,
    required: [true, 'Please provide semester'],
  },
  division: {
    type: String,
    required: [true, 'Please provide division'],
  },
  course: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'course',
    },
  ],
  marks: [
    {
      course: {
        type: mongoose.Schema.ObjectId,
        ref: 'course',
      },
      isa1: {
        type: Number,
        default: 0,
      },
      isa2: {
        type: Number,
        default: 0,
      },
      esa: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
