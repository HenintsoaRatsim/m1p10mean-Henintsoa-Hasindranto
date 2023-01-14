const Fiche = require("../models/Fiche");
const User = require("../models/User")
const {
    ObjectId
} = require("mongodb");
const Voiture = require("../models/Voiture");

const depotvoiture = (req, res) => {
    let idUser = new ObjectId(req.body.id);
    let voiture = {
        matricule: req.body.matricule,
        marque: req.body.marque,
        type: req.body.type,
        user: idUser
    }
    Voiture(voiture).save().then(function (voiture) {
        User.findById(idUser).exec().then(
            function (user) {
                let idvoiture = new ObjectId(voiture.id);
                user.voiture.push(idvoiture);
                //Insertion et update  User apres insertion nouvelle voiture dans le json 
                new User(user).save().then(function (user) {
                    Fiche({
                        datefiche: new Date(),
                        voiture: idvoiture,
                        user: idUser,
                        etat: 0,
                        etatpayement: 0
                    }).save().then(function () {
                        //liste fiche 
                        Fiche.find({
                            user: idUser,
                            etat: {
                                $lt: 2
                            }
                        }).populate('user').populate('voiture').then((result) => {
                            sendResult(res, result)
                        })
                    });
                });
            }
        );
    })
}

const ListeVoitureGarage = async (req, res) => {
    try {
        Fiche.find({
            user: new ObjectId(req.body.idUser),
            etat: {
                $lt: 2
            }
        }).populate('user').populate('voiture').then(function (result) {
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
        data,
        token: res.token
    });
}

module.exports = {
    depotvoiture,
    ListeVoitureGarage
}