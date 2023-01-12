const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const fiche = new Schema({
    intitule: { type: String, required: true },
});

module.exports= mongoose.model("fiche",fiche)