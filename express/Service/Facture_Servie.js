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
            // console.log("facture:");
            console.log(facture);
            Fiche.findOne({
                _id: new ObjectId(facture.fiche),
            }).populate({
                path: "reparations"
            }).populate({
                path: "user"
            }).populate({
                path: "voiture"
            }).select("reparations etatpayement").exec().then(function (detailfacture) {
                console.log("reparations")
                // console.log(detailfacture);
                console.log(detailfacture.reparations)
                let montantapayer = 0;
                for (const element of detailfacture.reparations) {
                    montantapayer = montantapayer + element.prix;
                }
                console.log("montant a payer =" + montantapayer);
                let resultat = {
                    detailfacture,
                    montantapayer
                }
                sendResult(res, resultat);
                // Reparations.aggregate([{
                //     $group: {
                //         _id: "$fiche",
                //         total: {
                //             $sum: "$prix"
                //         },
                //     }
                // }]).then(function (res) {
                //     console.log(res)
                // })
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