const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
   name: { 
      type: String, 
      required: true, 
   },
   type: { 
      type: String, 
      required: true, 
   },
   armorClassUnequipped: { 
      type: Number, 
      required: true, 
   },
   penalty: { 
      type: Boolean, 
      required: false, 
   },
});

module.exports = armorSchema;