const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const FactureShcema = new Schema({
    fiche: {
        type: ObjectId,
        ref: "Fiche",
        required: true
    },
    montantapayer: {
        type: Number,
        required: false,
        trim:true,

    },
    remise: {
        type: Number,
        required: false,
        trim:true,

    },
    montantpayer: {
        type: Number,
        required: false,
        trim:true,

    },
    datefacture: {
        type: Date,
        required: false
    },
    eta:{
        type:Number,
        default:0,
        required:true,
    }
});

module.exports = mongoose.model("Facture", FactureShcema);