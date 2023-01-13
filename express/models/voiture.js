const mongoose = require("mongoose");
const User = require("./User");
const Fiche = require("./Fiche");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const VoitureSchema = new Schema({
    matricule: {
        type: String,
        required: true
    },
    marque: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model("Voiture", VoitureSchema);