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
        0 : vo vita depot 
        1 : en reparation 
        2 : vita reparation
        3 : historique
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
        required: true
    }
});

module.exports = mongoose.model("Fiche", ficheShema);
