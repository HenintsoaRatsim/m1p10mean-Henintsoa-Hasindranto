const Fiche = require("../models/Fiche");
const User = require("../models/User")
const {
    ObjectId
} = require("mongodb");
const Voiture = require("../models/Voiture");

const depotvoiture = (req, res) => {
    let idUser = new ObjectId(res.locals.user.id);
    let datefiche = req.body.datefiche;
    let voiture = {
        matricule: req.body.matricule,
        marque: req.body.marque,
        type: req.body.type,
        user: idUser
    }
    Voiture(voiture).save().then(function (voiture) {
        User.findByIdAndUpdate(idUser, {
            $addToSet: {
                voiture: new ObjectId(voiture.id)
            }
        }, {
            new: true,
            upsert: true
        }).exec().then(
            function (user) {
                let idvoiture = new ObjectId(voiture.id);
                Fiche({
                    datefiche: datefiche,
                    voiture: idvoiture,
                    user: idUser,
                    etat: 0,
                    etatpayement: 0
                }).save().then(function () {
                    Fiche.find({
                        user: idUser,
                        etat: {
                            $lt: 2
                        }
                    }).populate('user').populate('voiture').then((result) => {
                        sendResult(res, result)
                    })
                });
            }
        );
    })
}

const getFicheDetail = async (req, res) => {
    let idFiche = new ObjectId(req.params.idfiche);
    Fiche.findOne({
        _id: idFiche
    }).populate('voiture').populate("user").populate({
        path: "reparations"
    }).exec().then(function (fiche) {
        console.log(fiche);
        console.log("id reparation: " + idFiche)
        sendResult(res, fiche);
    })
}

const ListeVoitureGarage = async (req, res) => {
    try {
        Fiche.find({
            user: new ObjectId(res.locals.user.id),
            etat: {
                $lt: 2
            }
        }).populate('user').populate('voiture').select().then(function (result) {
            if (result.length == 0) {
                return res.status(404).json({
                    message: "Aucune  voiture à reparer"
                })
            }
            return sendResult(res, result)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getHistorique = async (req, res) => {
    try {
        Fiche.find({
            user: new ObjectId(res.locals.user.id),
            etat: 2
        }).populate('user').populate('voiture').select().then(function (result) {
            if (result.length == 0) {
                return res.status(404).json({
                    message: "Aucune  voiture à reparer"
                })
            }
            return sendResult(res, result)
        });
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
    depotvoiture,
    ListeVoitureGarage,
    getHistorique,
    getFicheDetail
}