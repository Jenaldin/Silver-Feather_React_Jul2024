const mongoose = require('mongoose');

const spellLevelSchema = new mongoose.Schema({
   level: { 
      type: Number, 
      required: true
   },
   slots: { 
      type: Number,
      required: true 
   },
});

module.exports = spellLevelSchema;