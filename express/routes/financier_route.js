const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     ChiffreDaffaireParJours,
     ChiffreDaffaireParMois
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffredaffaireparjour/").get(ChiffreDaffaireParJours);

router.route("/chiffredaffaireparmois/").get(ChiffreDaffaireParMois);


module.exports = router;