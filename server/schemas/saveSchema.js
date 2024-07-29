const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
   points: {
      type: Number,
      min: 0,
      max: 15,
      default: 0,
   },
   proficient: {
      type: Boolean,
      default: false,
   },
});

module.exports = saveSchema;