const {
    ObjectId
} = require("mongodb");
const Fiche = require("../models/Fiche");

const Reparations = require("../models/Reparations");
const {
    transporter,
    SendMail
} = require("../models/Mail");
const {
    AjoutFacture
} = require("./Facture_Servie");


const getListeVoitureAReparer = async (req, res) => {
    try {
        Fiche.find({
            etat: 0
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture à reparer")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

/**
 * Update l'etat fiche
 * @param {*} idfiche 
 * @param {*} etat 
 */
async function UpdateEtatFiche(idfiche, etat) {
    Fiche.findByIdAndUpdate({
        _id: idfiche
    }, {
        etat: etat
    }, {
        new: true,
        upsert: true
    }).exec().then(function (fiche) {
        console.log(fiche)
        console.log("Etat set " + etat);
    })
}


/**
 * Reception d'un voiture par l'atelir 
 * Update etat vers 1
 * @param {*} req 
 * @param {*} res 
 */
const ReceptionnerVoiture = async (req, res) => {
    let idfiche = new ObjectId(req.query.idfiche);
    UpdateEtatFiche(idfiche, 1);
    AjoutFacture(idfiche);
    res.status(200).json({
        message: "La voiture est receptionnée"
    });
}
/** 
 * Ajout Reparation et Ajout Avancement reparation
 */
const AjoutReparation = async (req, res) => {
    let idFiche = new ObjectId(req.body.idfiche);
    let reparation = {
        fiche: idFiche,
        intitule: req.body.intitule,
        avancement: 0,
        description: req.body.description,
        prix: req.body.prix
    };
    new Reparations(reparation).save().then(function (reparation) {
        // console.log(reparation);
        Fiche.findOne({
            _id: idFiche
        }).then(function (fiche) {
            fiche.reparations.push(reparation.id);
            Fiche(fiche).save().then(function (fiche) {
                Fiche.findOne({
                    _id: idFiche
                }).populate('voiture').populate("user").populate({
                    path: "reparations"
                }).exec().then(function (fiche) {
                    console.log(fiche);
                    console.log("id reparation: " + idFiche)
                    sendResult(res, fiche);
                })
            })
        })
    })
}


/**
 * Ajouter avancement pour un reparation de vehicule
 * @param {*} req 
 * @param {*} res 
 */

const AjouterAvancement = async (req, res) => {
    let idReparation = new ObjectId(req.body.idreparation);
    let avancement = req.body.avancement;
    let date = req.body.date;
    if (avancement) {
        console.log("avancement ty e")
        let filter = {
            _id: idReparation
        };
        let update = {
            avancement: avancement
        };
        Reparations.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).then(function (reparation) {
            console.log(reparation);
            let idFiche = new ObjectId(reparation.fiche);
            SetFini(idFiche)
        })
    }
    if (date) {
        console.log("date ty e")
        SetDateDebutOuFin(date, idReparation)
    }
}


/**
 * Imsertion de la Date debut de la raparation 
 * ou date fin de la reparation
 * si l'avancement est egale a 100%
 * @param {*} date 
 * @param {*} idReparation 
 */


async function SetDateDebutOuFin(date, idReparation) {
    Reparations.findById({
        _id: idReparation
    }).then(function (reparation) {
        let idFiche = new ObjectId(reparation.fiche);
        if (reparation.datedebut) {
            //insertion date fin
            Reparations.findByIdAndUpdate(idReparation, {
                datefin: date
            }, {
                new: true,
                upsert: true
            }).exec().then(function () {
                console.log("tafiditra ny date fin");
            })
        } else {
            //Insertion date debut
            SetEtatFiche(idFiche, 1, 2); // Update  Etat to reparation
            Reparations.findByIdAndUpdate(idReparation, {
                datedebut: date
            }, {
                new: true,
                upsert: true
            }).exec().then(function () {
                console.log("tafiditra ny date debut");
            })
        }
    })
}


/**
 * Verifier si l'avancement de la reparation est egale 100%
 * donc on update l'etat de la reparation en 3
 * 
 * @param {*} idFiche 
 */
async function SetFini(idFiche) {
    Reparations.count({
        fiche: idFiche
    }).then(function (nbReparation) {
        Reparations.count({
            avancement: 100,
            fiche: idFiche
        }).then(async function (nbFini) {
            if (nbFini == nbReparation) {
                SetEtatFiche(idFiche, 2, 3); // Set Etat fin de reparation
                let Fiche_ = await Fiche.findById(idFiche).populate('user');
                console.log(Fiche_);
                console.log("mandefa mail any @ " + Fiche_.user.mail)
                /**
                 * Envoyer email fin reparation
                 */
                SendMail(Fiche_.user.mail, "Reparation terminé", "Bonjour!! la reparation de votre voiture est terminé avec succès")
            }
        })
    })
}

function SetEtatFiche(idFiche, avant, nouveau) {
    Fiche.findById(idFiche).then(function (fiche) {
        let etat = fiche.etat;
        if (etat == avant) {
            UpdateEtatFiche(idFiche, nouveau)
        }
    })
}

/**
 * Demmande de sortie de voiture
 * update etat fiche to 4
 * @param {*} res 
 * @param {*} req 
 */
const ValiderSortie = async (req, res) => {
    let idfiche = new ObjectId(req.params.idfiche);
    UpdateEtatFiche(idfiche, 5);
    res.status(200).json({
        message: "La demande de sortie est validé."
    });
}

const getDemandeSortie = async (req, res) => {
    Fiche.find({
        etat: 4
    }).then(function (fiche) {
        console.log(fiche)
    })
}


const getTempsMoyenneReparationVoiture = async (req, res) => {
    let idFiche = new ObjectId(req.params.idfiche);
    Reparations.find({
        fiche: idFiche
    }).then(function(reparations){
        // console.log(reparations);
        let datediff=0;
        for (const reparation of reparations) {
            let datedebut = new Date(reparation.datedebut);
            let datefin = new Date(reparation.datedebut);
            datediff = (datefin.getTime()-datedebut.getTime());
            console.log(datediff)
            console.log(datefin.getTime())
            console.log(datedebut.getTime())
        }
        // console.log(datediff);
    })
}



function sendResult(res, result) {
    return res.status(200).json({
        result
    });
}

function sendErreur(res, message) {
    res.status(404).json({
        message: message
    })
}

module.exports = {
    getListeVoitureAReparer,
    AjoutReparation,
    AjouterAvancement,
    ReceptionnerVoiture,
    UpdateEtatFiche,
    ValiderSortie,
    getDemandeSortie,
    getTempsMoyenneReparationVoiture
}