const {
    ObjectId
} = require("mongodb");
const Facture = require("../models/Facture");
const Fiche = require("../models/Fiche");
const Reparations = require("../models/Reparations");
const {
    UpdateEtatFiche
} = require("./Atelier_Service");

const ValiderPaiement = async (req, res) => {
    let idFiche = new ObjectId(req.body.idfiche);
    let datefacture = req.body.date; //Mapiditra daty rehefa valider facture
    Fiche.find({
        _id: idFiche
    }).then(function (fiche) {
        if (fiche.length == 0) sendErreur(res, "Fiche introuvable");
        else
            Fiche.findByIdAndUpdate({
                _id: idFiche
            }, {
                etatpayement: 1
            }, {
                new: true,
                upsert: true
            }).populate('reparations').exec().then(function (fiche) {

                // console.log(fiche)

                let montantapayer = 0;
                for (const element of fiche.reparations) {
                    montantapayer = montantapayer + element.prix;
                }
                console.log(montantapayer)
                let facture = {
                    fiche: idFiche,
                    montantapayer: montantapayer,
                    datefacture: datefacture
                }
                Facture(facture).save().then(function (facture) {
                    console.log(facture);
                    console.log("Etat facture est payé");
                    console.log("Facture inserer");
                    sendResult(res, fiche);
                })

            })
    })
}

function sendErreur(res, message) {
    res.status(200).json({
        message: message
    })
}

/**
 * Avoir le temps de reparations moyenne par fiche de voiture
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getTempsMoyenneReparationVoiture = async (req, res) => {
    let idFiche = new ObjectId(req.params.idfiche);
    Reparations.find({
        fiche: idFiche
    }).then(function (reparations) {
        let TempsTotalMs = 0;
        let countReparation = 0;
        for (const reparation of reparations) {
            countReparation++;
            let datedebut = new Date(reparation.datedebut);
            let datefin = new Date(reparation.datefin);
            TempsTotalMs = TempsTotalMs + (datefin.getTime() - datedebut.getTime());
        }
        let tempsMoyenne = ConvertMsToTime(TempsTotalMs / countReparation);
        let tempsTotal = ConvertMsToTime(TempsTotalMs)
        let result = {
            tempsTotal,
            tempsMoyenne,
            reparations
        }
        sendResult(res, result)
    })
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function ConvertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)} heure(s) ${padTo2Digits(minutes)} minute(s) ${padTo2Digits(
      seconds,
    )} seconde(s)`;
}


const ChiffreDaffaireParJours = async (req, res) => {
    chiffredaffaire(res, "%d/%m/%Y");
}
const ChiffreDaffaireParMois = async (req, res) => {
    chiffredaffaire(res, "%m/%Y");
}

async function chiffredaffaire(res, Filtre) {
    try {
        let chiffredaffaire = await Facture.aggregate([
            // {
            //     $match: {
            //         $expr: {
            //             $and: [{
            //                 "$eq": [{
            //                     "$year": "$datefacture"
            //                 }, 2023]
            //             }]
            //         }
            //     }
            // },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: Filtre,
                            date: "$datefacture"
                        }
                    },
                    "montantapayer": {
                        $sum: "$montantapayer"
                    }
                }
            },
        ]).exec()
        sendResult(res, chiffredaffaire);
        console.log(chiffredaffaire);
    } catch (error) {

    }

}



function sendResult(res, result) {
    return res.status(200).json({
        result
    });
}

function sendErreur(res, result) {
    return res.status(200).json({
        result
    });
}


module.exports = {
    ValiderPaiement,
    getTempsMoyenneReparationVoiture,
    ChiffreDaffaireParJours,
    ChiffreDaffaireParMois
}