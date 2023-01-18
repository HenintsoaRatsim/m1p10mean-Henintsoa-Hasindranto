const {
    ObjectId
} = require("mongodb");
const Fiche = require("../models/Fiche");
const {
    UpdateEtatFiche
} = require("./Atelier_Service");

const ValiderPaiment = async (req, res) => {
    let idFiche = new ObjectId(req.params.idfiche);
    Fiche.findByIdAndUpdate({
        _id: idFiche
    }, {
        etat: 1
    }, {
        new: true,
        upsert: true
    }).exec().then(function (fiche) {
        console.log(fiche)
        console.log("Etat set " + etat);
    })
}

module.exports = {
    ValiderPaiment
}