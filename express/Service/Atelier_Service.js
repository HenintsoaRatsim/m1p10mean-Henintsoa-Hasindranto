const {
    ObjectId
} = require("mongodb");
const Fiche = require("../models/Fiche");

const Reparations = require("../models/Reparations");
const {
    transporter,
    SendMail
} = require("../models/Mail");


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

const AjoutReparation = async (req, res) => {
    let idFiche = new ObjectId(req.body.idfiche);
    let reparation = {
        fiche: idFiche,
        intitule: req.body.intitule,
        datedebut: new Date(),
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
const AjouterAvancement = async (req, res) => {
    let idReparation = new ObjectId(req.body.idreparation);
    let avancement = req.body.avancement;
    let date = req.body.date;
    if (avancement) {
        console.log("avancement ty e")
        // let filter = {
        //     _id: idReparation
        // };
        // let update = {
        //     avancement: avancement
        // };
        // Reparations.findOneAndUpdate(filter, update, {
        //     new: true,
        //     upsert: true
        // }).then(function (reparation) {
        //     console.log(reparation);
        //     let idFiche = new ObjectId(reparation.fiche);
        //     SetEtatFiche(idFiche, 0, 1); // Etat en reparation
        //     SetFini(idFiche)
        // })
    }
    if (date) {
        console.log("avancement ty e")
        SetDateDebutOuFin(date, idReparation)
    }
}

function SetDateDebutOuFin(date, idReparation) {
    Reparations.findById({
        _id: idReparation
    }).then(function (reparation) {
        console.log("date ="+reparation.datedebut);
        // if (reparation.avancement == 0) {
        //     console.log("avancement verif date 1=" + 0);
        // }
        // if (reparation.avancement == 100) {
        //     console.log("avancement vrif date 2=" + 100);
        // }
    })
}



async function SetFini(idFiche) {
    Reparations.count({
        fiche: idFiche
    }).then(function (nbReparation) {
        Reparations.count({
            avancement: 100,
            fiche: idFiche
        }).then(async function (nbFini) {
            if (nbFini == nbReparation) {
                SetEtatFiche(idFiche, 1, 2);
                let Fiche_ = await Fiche.findById(idFiche).populate('user');
                console.log(Fiche_);
                console.log("mandefa mail any @ " + Fiche_.user.mail)
                SendMail(Fiche_.user.mail, "Reparation terminé", "Bonjour!! la reparation de votre voiture est terminé avec succès")
            }
            // else{
            //     SetEtatFiche(idFiche,1)
            // }
        })
    })
}

function SetEtatFiche(idFiche, avant, nouveau) {
    Fiche.findById(idFiche).then(function (fiche) {
        let etat = fiche.etat;
        if (etat == avant) {
            Fiche.findByIdAndUpdate({
                _id: idFiche
            }, {
                etat: nouveau
            }, {
                new: true,
                upsert: true
            }).then(function (fiche) {
                console.log(fiche);
            })
        }
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
}