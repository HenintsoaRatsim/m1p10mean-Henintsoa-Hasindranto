const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const DepenseSchema = new Schema({
    datedepense: {
        type: Date,
        trim: true,
        required: true
    },
    typedepense: {
        type: ObjectId,
        ref: "Typedepense",
        required: true
    },
    montant: {
        type: Number,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model("Depense", DepenseSchema);