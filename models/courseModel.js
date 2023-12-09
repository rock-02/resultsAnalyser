const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Please provide name'],
  },
  courseId: {
    type: String,
    required: [true, 'Please provide id'],
    unique: true,
  },
  semester: {
    type: String,
    required: [true, 'Please provide semester'],
  },
  credits: {
    type: Number, 
    required: [true, 'Please provide credits'],
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
