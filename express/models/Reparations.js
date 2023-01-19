const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const ReparationShema = new Schema({
    intitule: {
        type: String,
        required: true,
        trim: true,
    },
    datedebut: {
        type: Date,
        required: false
    },
    datefin: {
        type: Date,
        required: false
    },
    avancement: {
        type: Number,
        default: 0,
        required: true
    },
    prix: {
        type: Number,
        required: true,
        trim: true,
    },
    fiche: {
        type: ObjectId,
        ref: "Fiche",
        required: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    etatareparation: {
        /**
         * 0 diagnostique 
         * 1 Apres ajouter date debut ,encours de reparations de et ajouter avancement
         * 2 reparation fini zany hoe insertion 100 avancement de mivoka ny imput date
         * 3 apres insertion date fin
         * 
         */
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model("Reparation", ReparationShema);