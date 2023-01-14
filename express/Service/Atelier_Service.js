const {
    ObjectId
} = require("mongodb");
const Fiche = require("../models/Fiche");

const Reparations = require("../models/Reparations");


const getListeVoitureAReparer = async (req, res) => {
    try {
        Fiche.find({
            etat: 1
        }).populate("voiture").populate("user").then(function (fiche) {
            if (fiche.length > 0) {
                return sendResult(res, fiche);
            }
            return sendErreur(res,"Pas de voiture à reparer")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const AjoutReparation = (req, res) => {
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
                    id: idFiche
                }).populate('voiture').populate("user").populate({
                    path: "reparations"
                }).exec().then(function (fiche) {
                    sendResult(res, fiche);
                })
            })
        })
    })
}

const Reparer = (req,res)=>{
    let idReparation = new ObjectId(req.body.idreparation);
    
}

function sendResult(res, result) {
    res.status(200).json({
        data: result,
        token: res.token
    });
}
function sendErreur(res,message){
    res.status(404).json({
        message: message
    })
}

module.exports ={
    getListeVoitureAReparer,
    AjoutReparation,

}