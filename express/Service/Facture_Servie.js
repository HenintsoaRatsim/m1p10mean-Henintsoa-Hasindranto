const {
    ObjectId
} = require("mongodb");
const Facture = require("../models/Facture");
const Fiche = require("../models/Fiche");


const getFacture = async (req, res) => {
    try {
        let idfiche = new ObjectId(req.params.idfiche);
        Facture.findById(idfiche).then(function(facture){
            // console.log(facture);
            Fiche.findOne({
                _id: new ObjectId(facture.fiche),
            }).populate({
                path: "reparations"
            }).select("reparations").exec().then(function (reparations) {
                console.log(reparations);
                resultat={
                    facture:facture,
                    reparations,
                }
                sendResult(res, resultat);
            })
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

function sendErreur(res, message) {
    res.status(404).json({
        message: message
    })
}

function sendResult(res, data = null) {
    res.status(200).json({
        data
    });
}


module.exports ={
    getFacture,
    AjoutFacture
}