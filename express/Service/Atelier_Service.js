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

/**
 * La liste des voitures dans l'etat du fiche est egale a 0
 * @param {*} req 
 * @param {*} res 
 */
const getListeVoitureAReparer = async (req, res) => {
    try {
        console.log("liste voiture receptionner")
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
 * La liste voiture dans l'etat du fiche est egale a 1
 * @param {*} req 
 * @param {*} res 
 */
const getListeVoituReceptionner = async (req, res) => {
    try {
        // console.log("liste voiture receptionner")
        Fiche.find({
            etat: 1
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture receptionnée")
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
async function UpdateEtatFiche(idfiche, etat, res) {
    Fiche.findByIdAndUpdate({
        _id: idfiche
    }, {
        etat: etat
    }, {
        new: true,
        upsert: true
    }).populate('user').populate('voiture').exec().then(function (fiche) {
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
    let idfiche = new ObjectId(req.params.idfiche);
    // console.log(req.params.idfiche);
    // console.log(idfiche);
    UpdateEtatFiche(idfiche, 1);
    AjoutFacture(idfiche);
    res.status(200).json({
        message: "La voiture est receptionnée"
    });
}
/**
 * Ajouter Reparation 
 * @param {*} req 
 * @param {*} res 
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
    let avancement = parseInt(req.body.avancement);
    if (avancement > 100 || avancement < 0) return sendErreur(res, "Avancement invalide");
    let date = req.body.date;
    if (avancement) {
        /** *******************************
         * set Eta de reparation fini
         */
        if (avancement == 100) {
            console.log("set etat reparation 2")
            setEtatReparation(idReparation, 2)
        }
        /******************************************* */
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
            res.status(200).json("insertion avancement " + avancement)
        })
    }
    if (date) {
        console.log("date ty e")
        SetDateDebutOuFin(date, idReparation);
        res.status(200).json("insertion date " + date);
    }
}


/**
 * Imsertion de la Date debut de la raparation 
 * ou date fin de la reparation
 * 
 * @param {*} date 
 * @param {*} idReparation 
 */
async function SetDateDebutOuFin(date, idReparation) {
    Reparations.findById({
        _id: idReparation
    }).then(function (reparation) {
        let idFiche = new ObjectId(reparation.fiche);
        if (reparation.datedebut || reparation.avancement ==100) {
            //insertion date fin
            Reparations.findByIdAndUpdate(idReparation, {
                datefin: date,
                etatareparation: 3
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
                datedebut: date,
                etatareparation: 1
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
 * Verifier si le nombre d'avancement  100% est egale aux nombre de reparations
 * donc on update l'etat de la Fiche en 3
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

/**
 * Update l'etat du fiche
 * 
 * @param {} idFiche 
 * @param {*} avant 
 * @param {*} nouveau 
 */
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
    let fiche = await Fiche.findOne({
        _id: idfiche
    });
    if (fiche.length == 0)
        return sendErreur(res, "Fiche introuvable")
    else if (fiche.etatpayement == 0)
        return sendErreur(res, "Impossible de valider car la facture  n'est pas encore payée")
    else
        UpdateEtatFiche(idfiche, 5);
    return res.status(200).json({
        message: "La demande de sortie est validé."
    });
}



/**
 * update l'etat de la reparation pour l'input date et 
 * avancement
 *  
 * @param {*} idReparations 
 * @param {number} etat 
 */
function setEtatReparation(idReparations, etat) {
    Reparations.findByIdAndUpdate({
        _id: idReparations
    }, {
        etatareparation: etat
    }, {
        new: true,
        upsert: true
    }).exec().then(function (Reparations) {
        console.log(Reparations)
        console.log("Etat reparation set " + etat);
    })
}

/**
 * get Liste voiture a reparer etat =2
 * @param {*} req 
 * @param {*} res 
 */
const getVoitureEnReparation = async (req, res) => {
    try {
        console.log("liste en reparation");
        Fiche.find({
            etat: 2
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture receptionnée")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

/**
 * la liste de demande de sortie etat fiche =4
 * @param {*} req 
 * @param {*} res 
 */
const getDemandeSortie = async (req, res) => {
    try {
        console.log("liste de mande de sortie");
        Fiche.find({
            etat: 4
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res, "Pas de voiture receptionnée")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


/**
 * Envoyer les resutats Json
 * 
 * @param {*} res 
 * @param {*} result 
 * @returns 
 */
function sendResult(res, result) {
    return res.status(200).json({
        result
    });
}

function sendErreur(res, message) {
    return res.status(202).json({
        message: message
    })
}

module.exports = {
    getListeVoitureAReparer,
    getListeVoituReceptionner,
    AjoutReparation,
    AjouterAvancement,
    ReceptionnerVoiture,
    UpdateEtatFiche,
    ValiderSortie,
    getDemandeSortie,
    getVoitureEnReparation

}