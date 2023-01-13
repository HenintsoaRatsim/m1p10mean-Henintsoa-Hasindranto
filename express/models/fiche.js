const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const ficheShema = new Schema({
    datefiche: {
        type: Date,
        required: true
    },
    idvoiture: {
        type: ObjectId,
        ref: "voiture",
        required: true
    },
    iduser: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    etat: {
        type: Number,
        required: true
    },
    reparations: [{
        intitule: {
            type: String,
            required: true
        },
        datedebut: {
            type: Date,
            required: true
        },
        datefin: {
            type: Date,
            required: true
        },
        avancement: {
            type: Number,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }],
    etatpayement: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Fiche", ficheShema);
