const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const UserSchema = new Schema({
    nom: {
        type: String,
        required: true,
        trim:true,
    },
    prenom: {
        type: String,
        required: true,
        trim:true,
    },
    mail: {
        type: String,
        required: true,
        lowercase:true,
        trim:true,
    },
    mdp: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        trim:true,
    },
    role: {
        type: ObjectId,
        ref: "Role",
        required: true
    },
    voiture: [{
        type: ObjectId,
        ref: "Voiture",
        required: true

    }]
});

module.exports = mongoose.model("User", UserSchema);