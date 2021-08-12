const mongoose = require("mongoose");

const DiseaseSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    info: { type: String, default: "" },
    underlyingDisorders: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Disease", default: [] },
    ],
    marks: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Mark", default: [] }],
  },
  { timeStamps: true }
);

const DiseaseSynonymSchema = mongoose.Schema({
  mappingType: {
    type: String,
    enum: ["equivalent", "explicit"],
    default: "equivalent",
  },
  input: { type: String, default: null },
  synonyms: { type: Array, default: [] }, //array of strings
});

const Disease = mongoose.model("Disease", DiseaseSchema);
const DiseaseSynonym = mongoose.model("DiseaseSynonym", DiseaseSynonymSchema);
module.exports = { Disease, DiseaseSynonym };
