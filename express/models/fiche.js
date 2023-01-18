const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const ficheShema = new Schema({
    datefiche: {
        type: Date,
        required: true
    },
    voiture: {
        type: ObjectId,
        ref: "Voiture",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    etat: {
        type: Number,
        /*
        0 : Etat Depot 
        1 : Etat receptionner par Atelier
        2 : Etat en reparation 
        3 : Etat Fin de reparation 
        4 : Etat demmande de sortie
        5 : Etat sortie
        */
        required: true
    },
    reparations: [{
        type: ObjectId,
        ref: "Reparation",
        required: true
    }],
    etatpayement: {
        type: Number,
        default:0,
        required: true
        /**
         * 0 non payer
         * 1 payer
         */
    }
});

module.exports = mongoose.model("Fiche", ficheShema);
