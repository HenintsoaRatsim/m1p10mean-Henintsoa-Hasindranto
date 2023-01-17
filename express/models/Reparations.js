const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const ReparationShema = new Schema({
    intitule: {
        type: String,
        required: true,
        trim:true,
    },
    datedebut: {
        type: Date,
        required: true
    },
    datefin: {
        type: Date,
        required: false
    },
    avancement: {
        type: Number,
        default:0,
        required: true
    },
    prix: {
        type: Number,
        required: true,
        trim:true,
    },
    fiche: {
        type: ObjectId,
        ref: "Fiche",
        required: true
    },
    description: {
        type: String,
        required: false,
        trim:true,
    }
});

module.exports = mongoose.model("Reparation", ReparationShema);