const Fiche = require("../models/Fiche");
const User = require("../models/User")
const {
    ObjectId
} = require("mongodb");

const depotvoiture = (req, res) => {
    let idUser = new ObjectId(req.body.id);
    //Recherche User
    User.findById(idUser).exec().then(
        function (user) {
            let voiture = {
                matricule: req.body.matricule,
                marque: req.body.marque,
                type: req.body.type
            }
            user.voiture.push(voiture);
            //Insertion et update  User apres insertion nouvelle voiture dans le json 
            new User(user).save().then(function (result) {
                User.findOne({
                    "voiture.matricule": req.body.matricule,
                    id: idUser
                }).then(function (u) {

                    //prendre la liste des voiture de l'utilisateur
                    let ListeVoiture = u.voiture;
                    console.log("les voitures "+ListeVoiture);
                    //prendre la voiture a  reparer
                    let Voiture = ListeVoiture.find(({
                        matricule
                    }) => matricule === req.body.matricule);
                    console.log("voiture "+Voiture);
                    //insertion fichier avec la voiture ci-dessous
                    Fiche({
                        datefiche: new Date(),
                        idvoiture: Voiture.id,
                        iduser: idUser,
                        etat: 0,
                        etatpayement: 0
                    }).save().then(function (result) {
                        console.log("Fiche depot inséré");
                    });
                });
            });
            
        }
    );
}

function sendResult(res, result = null) {
    res.status(200).json({
        donnee: result,
        token: res.token
    });
}
// function getVoiture(voiture,plaque) {
//     return voiture.name === plaque;
//   }

module.exports = {
    depotvoiture
}