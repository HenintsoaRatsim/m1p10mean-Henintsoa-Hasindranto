const mongoose = require("mongoose");
const User = require("./User");
const Fiche = require("./aFiche");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const VoitureSchema = new Schema({
    matricule: {
        type: String,
        required: true,
        trim:true,
    },
    marque: {
        type: String,
        required: true,
        trim:true,
    },
    type: {
        type: String,
        required: true,
        trim:true,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    
});



module.exports = mongoose.model("Voiture", VoitureSchema);