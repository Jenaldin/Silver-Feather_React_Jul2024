const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
   points: {
      type: Number,
      min: 0,
      max: 25,
      default: 0,
   },
   proficient: {
      type: Boolean,
      default: false,
   },
});

module.exports = skillSchema;