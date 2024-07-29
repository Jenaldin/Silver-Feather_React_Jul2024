const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
   score: {
      type: Number,
      min: 1,
      max: 20,
      required: true,
   },
   modifier: {
      type: Number,
      min: -5,
      max: 10,
      required: true,
   },
});

module.exports = abilitySchema;