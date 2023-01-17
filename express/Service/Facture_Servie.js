const {
    ObjectId
} = require("mongodb");
const Facture = require("../models/Facture");
const Fiche = require("../models/Fiche");
const Reparations = require("../models/Reparations");


const getFacture = async (req, res) => {
    try {
        let idfiche = new ObjectId(req.params.idfiche);
        Facture.findById(idfiche).then(function (facture) {
            // console.log(facture);
            Fiche.findOne({
                _id: new ObjectId(facture.fiche),
            }).populate({
                path: "reparations"
            }).exec().then(function (fiche) {
                // console.log(fiche);
                resultat = {
                    facture: facture,
                    fiche,
                }
                Reparations.aggregate([{
                    $group:{
                        _id:"$fiche",
                        total:{$sum:"$prix"},
                    }
                }]).then(function(res){
                    console.log(res)
                    // sendResult(res, resultat);

                })
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function AjoutFacture(idFiche) {
    try {
        let facture = {
            fiche: idFiche,
        }
        Facture(facture).save().then(function (facture) {
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


module.exports = {
    getFacture,
    AjoutFacture
}