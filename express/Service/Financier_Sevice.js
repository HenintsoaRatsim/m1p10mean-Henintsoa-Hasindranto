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
    let fiche = await Fiche.find({
        _id: idFiche
    }).populate("voiture").populate("user");
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
            reparations,
            fiche
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
 * par mois "%m/%Y"
 * par jour "%d/%m/%Y"
 * @param {*} req 
 * @param {*} res 
 */

const ChiffreAffaire = async (req, res) => {
    let value = req.body.filtre;
    let filtre = ""
    if (value == "jour") {
        filtre = "%d/%m/%Y"
    } else {
        filtre = "%m/%Y"
    }
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
        let chiffredaffaires = await Facture.aggregate([
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
        sendResult(res, chiffredaffaires);
        console.log(chiffredaffaires);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}

function mois(){
    var mois = new Array(
'janvier',
'février',
'mars',
'avril',
'mai',
'juin',
'juillet',
'août',
'septembre',
'octobre',
'novembre',
'décembre'
);
  return mois
}



/**
 * Get Depense par mois et annee
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getBenefice = async (req, res) => {
    try {
        let mois = parseInt(req.body.mois);
        let annee = parseInt(req.body.annee);
        if (verifNull(res, mois, "Choisissez un mois svp")) return;
        if (verifNull(res, annee, "Inserez une année svp")) return;
        let chiffredaffaire = await getSumChiffreDaffaire(mois, annee);
        console.log("Chiffre d'affaire = " + chiffredaffaire)
        let depense = await getTotalDepense(mois, annee);
        console.log("Depense = " + depense);
        let Benefice = chiffredaffaire - depense;
        console.log("Benefice = " + Benefice);
        let mois_=mois()[mois-1];
        let data = {
            mois_,
            annee,
            chiffredaffaire: chiffredaffaire,
            depense: depense,
            benefice: Benefice
        }
        sendResult(res, data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getSumChiffreDaffaire(mois, annee) {
    let chiffredaffaireSum = await Facture.aggregate([{
            $match: {
                $expr: {
                    $and: [{
                            "$eq": [{
                                "$month": "$datefacture"
                            }, mois]
                        },
                        {
                            "$eq": [{
                                "$year": "$datefacture"
                            }, annee]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%m/%Y",
                        date: "$datefacture"
                    }
                },
                "montantapayer": {
                    $sum: "$montantapayer"
                }
            }
        },
    ]).exec();
    if (chiffredaffaireSum.length == 0) return 0;
    return chiffredaffaireSum[0].montantapayer;
}

async function getTotalDepense(mois, annee) {
    let depenseSum = await Depense.aggregate([{
            $match: {
                $expr: {
                    $and: [{
                            "$eq": [{
                                "$month": "$datedepense"
                            }, mois]
                        },
                        {
                            "$eq": [{
                                "$year": "$datedepense"
                            }, annee]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%m/%Y",
                        date: "$datedepense"
                    }
                },
                "depensetotal": {
                    $sum: "$montant"
                }
            }
        },
    ]).exec();
    if (depenseSum.length == 0) return 0;
    return depenseSum[0].depensetotal;
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

/**
 * La liste des types de depense
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTypeDeDepense = async (req, res) => {
    let types = await Typedepense.find();

    if (types.length == 0) return sendErreur(res, "Pas de type de dépense trouvé");
    return sendResult(res, types);
}

/**
 * La liste de tous les dépense
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getListeDepense = async (req, res) => {

    let depenses = await Depense.find().populate('typedepense');
    if (depenses.length == 0) return sendErreur(res, "Pas de dépense trouvé");
    return sendResult(res, depenses);
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
    if (verifNull(res, req.body.idtypedepense, "Inserer un type de depense svp")) return;
    if (!montant || parseInt(montant) <= 0) return sendErreur(res, "Ajouter un montant valide svp");
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

/**
 * La liste des voiture dans la reparation est fini
 * pour permettre le paiemenet de la facture;
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getListeVoiturePaiement = async (req, res) => {
    try {
        console.log("validation paiement");
        Fiche.find({
            etat: 3,
            etatpayement: 0
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getlistevoitureTempsMoyenne = async (req, res) => {
    try {
        console.log("validation paiement");
        Fiche.find({
            etat: {
                $gte: 3
            }
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


/**
 * Recherche chiffre d'affaire entre deux date 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const Rechereche = async (req, res) => {
    let datedebut = req.body.datedebut;
    let datefin = req.body.datefin;
    if (verifNull(res, datedebut, "Ajouter une date debut svp")) return;
    if (verifNull(res, datefin, "Ajouter une date fin svp")) return;
    try {
        let chiffredaffaires = await Facture.aggregate([{
                $match: {
                    datefacture: {
                        $gte: new Date(datedebut),
                        $lte: new Date(datefin)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d/%m/%Y",
                            date: "$datefacture"
                        }
                    },
                    "montantapayer": {
                        $sum: "$montantapayer"
                    }
                }
            },
        ]).exec()
        sendResult(res, chiffredaffaires);
        console.log(chiffredaffaires);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


module.exports = {
    ValiderPaiement,
    getTempsMoyenneReparationVoiture,
    ChiffreAffaire,
    AjoutTypeDeDepense,
    AjoutDepense,
    getBenefice,
    getListeVoiturePaiement,
    getlistevoitureTempsMoyenne,
    getTypeDeDepense,
    getListeDepense,
    Rechereche
}