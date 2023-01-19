const {
    ObjectId
} = require("mongodb");
const Depense = require("../models/Depense");
const Facture = require("../models/Facture");
const Fiche = require("../models/Fiche");
const Reparations = require("../models/Reparations");
const Typedepense = require("../models/Typedepense");
const {
    UpdateEtatFiche
} = require("./Atelier_Service");

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

/**
 * Update l'etat paiement fiche 1 donc etat de paiement est egale a payé
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Avoir la liste des chiffres d'affaire
 * à partir des filtre
 * par mois "%M/%Y"
 * par jour "%d/%M/%Y"
 * @param {*} req 
 * @param {*} res 
 */

const ChiffreAffaire = async (req, res) => {
    let filtre = req.body.filtre;
    getChriffreAffaire(res, filtre);
}

/**
 * Fonction calcule chiffre d'affaire
 * 
 * @param {*} res 
 * @param {*} Filtre 
 */
async function getChriffreAffaire(res, Filtre) {
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

/**
 * Ajouter type de depense
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const AjoutTypeDeDepense = async (req, res) => {
    let intitule = req.body.intitule;
    if (verifNull(res, intitule, "Inserer l'intitule svp")) return;
    let typedepense = {
        intitule: intitule,
    }
    let TD = await Typedepense(typedepense).save()
    return sendResult(res, TD);
}

function verifNull(res, input, message) {
    if (!input || input == "" || input == null || input == undefined || input === undefined || input === null || input.length === 0) {
        sendErreur(res, message)
        return true;
    }
    return false;
}

const AjoutDepense = async (req, res) => {
    let datedepense = req.body.date;
    let typedepense = new ObjectId(req.body.idtypedepense);
    let montant = req.body.montant;
    if (verifNull(res, datedepense, "Inserer la date svp")) return;
    if (verifNull(res, req.body.idtypedepense, "Inserer l type de depense svp")) return;
    if (verifNull(res, montant, "Inserer le montant svp")) return;
    let Dep = {
        datedepense: datedepense,
        typedepense: typedepense,
        montant: montant
    };
    let depense = await Depense(Dep).save();
    return sendResult(res, depense)

}


function sendErreur(res, message) {
    res.status(200).json({
        message: message
    })
}


module.exports = {
    ValiderPaiement,
    getTempsMoyenneReparationVoiture,
    ChiffreAffaire,
    AjoutTypeDeDepense,
    AjoutDepense
}