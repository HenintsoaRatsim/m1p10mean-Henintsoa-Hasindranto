const {
    ObjectId
} = require("mongodb");
const Facture = require("../models/Facture");
const Fiche = require("../models/Fiche");


const getFacture = async (req, res) => {
    try {
        let idfiche = new ObjectId(req.params.idfiche);
        Facture.findById(idfiche).populate({path:'fiche',populate:{path:'reparations.'}}).then(function(facture){
            console.log(facture);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function AjoutFacture(idFiche){
    try {
        let facture ={
            fiche: idFiche,
        }
        Facture(facture).save().then(function(facture){
            console.log("Facture enregistrée");
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports ={
    getFacture,
    AjoutFacture
}