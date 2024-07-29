const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
   name: { 
      type: String, 
      required: true,
   },
   weaponType: { 
      type: String, 
      required: true,
   },
   properties: { 
      type: String, 
   },
   damageType: { 
      type: String, 
      required: true,
   },
   diceDamage: { 
      type: String, 
      required: true,
   },
});

module.exports = weaponSchema;