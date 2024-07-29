const mongoose = require('mongoose');
const validator = require('validator');

const abilitySchema = require('../schemas/abilitySchema');
const saveSchema = require('../schemas/saveSchema');
const skillSchema = require('../schemas/skillSchema');
const weaponSchema = require('../schemas/weaponSchema');
const armorSchema = require('../schemas/armorSchema');
const spellLevelSchema = require('../schemas/spellLevelSchema');

const characterSchema = new mongoose.Schema({
   name: {
      type: String,
      match: [/^[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+(\-[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+)*$/, 'Invalid name'],
      minlength: [2, 'Name should be at least 2 characters'],
      maxlength: [100, 'Name should be no more than 30 characters'],
      required: [true, 'Name is required'],
      unique: true,
   },
   race: {
      type: String,
      required: [true, 'Race is required'],
   },
   subrace: {
      type: String,
      required: [true, 'Subrace is required'],
   },
   class: {
      type: String,
      required: [true, 'Class is required'],
   },
   age: {
      type: Number,
   },
   height: {
      type: Number,
   },
   weight: {
      type: Number,
   },
   background: {
      type: String,
   },
   eyes: {
      type: String,
   },
   hair: {
      type: String,
   },
   skin: {
      type: String,
   },
   level: {
      type: Number,
      default: 1,
   },
   alignment: {
      type: String,
      required: [true, 'Alignment is required'],
   },
   hitPointsDefault: {
      type: Number,
      default: 1,
      required: [true, 'Hit points are required'],
   },
   hitDice: {
      type: String,
      required: [true, 'Hit dice is required']
   },
   proficiencyScore: {
      type: Number,
      required: [true, 'Proficiency is required']
   },
   initiative: {
      type: Number,
      required: [true, 'Initiative is required']
   },
   speed: {
      type: Number,
      required: [true, 'Speed is required']
   },
   abilities: {
      str: {...abilitySchema},
      dex: {...abilitySchema},
      con: {...abilitySchema},
      wis: {...abilitySchema},
      int: {...abilitySchema},
      cha: {...abilitySchema},
   },
   saves: {
      str: {...saveSchema},
      dex: {...saveSchema},
      con: {...saveSchema},
      wis: {...saveSchema},
      int: {...saveSchema},
      cha: {...saveSchema},
   },
   spellSaveDC: {
      type: Number,
   },
   spellcastingAbility: {
      type: String,
   },
   armorClass: {
      type: Number,
      required: [true, 'Armor Class is required']
   },
   meleeAttackBonus: {
      type: Number,
   },
   rangedAttackBonus: {
      type: Number,
   },
   spellAttackBonus: {
      type: Number,
   },
   skills: {
      acrobatics: {...skillSchema},
      animalHandling: {...skillSchema},
      arcana: {...skillSchema},
      athletics: {...skillSchema},
      deception: {...skillSchema},
      history: {...skillSchema},
      insight: {...skillSchema},
      intimidation: {...skillSchema},
      investigation: {...skillSchema},
      medicine: {...skillSchema},
      nature: {...skillSchema},
      perception: {...skillSchema},
      performance: {...skillSchema},
      persuasion: {...skillSchema},
      religion: {...skillSchema},
      sleightOfHand: {...skillSchema},
      stealth: {...skillSchema},
      survival: {...skillSchema},
   },
   equippedWeapons: {
      type: {...weaponSchema},
   },
   equippedArmor: { 
      type: {...armorSchema},
   },
   avatar: {
      type: String,
      validate: {
         validator: function (value) {
            return validator.isURL(value) && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
         },
         message: 'Invalid avatar link',
      },
   },
   equipment: [{ 
      type: String 
   }],
   features: [{ 
      type: String 
   }],
   languages: [{ 
      type: String 
   }],
   backstory: {
      type: String
   },
   otherDetails: {
      type: String
   },
   playerNotes: {
      type: String
   },
   knownSpells: [{ 
      type: String 
   }],
   preparedSpells: [{ 
      type: String 
   }],
   spellSlots: [
      spellLevelSchema,
   ],
   isPublished: { 
      type: Boolean, 
      required: false, 
   },
   isPublic: { 
      type: Boolean, 
      required: false, 
   },
   campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
   },
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;