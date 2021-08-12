const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
  name: { type: String, require: true },
  synonyms: { type: Array, default: [] },
  location: { type: String, default: "general" }, //blood, urine,lungs, skin
});
const markSynonymSchema = mongoose.Schema({
  mappingType: {
    type: String,
    enum: ["equivalent", "explicit"],
    default: "equivalent",
  },
  input: { type: String, default: null },
  synonyms: { type: Array, default: [] }, //array of strings
});

const Mark = mongoose.model("Mark", markSchema);
const MarkSynonym = mongoose.model("MarkSynonym", markSynonymSchema);
module.exports = { Mark, MarkSynonym };
