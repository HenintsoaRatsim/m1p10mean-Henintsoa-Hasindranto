const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     ChiffreDaffaireParJours,
     ChiffreDaffaireParMois,
     AjoutTypeDeDepense,
     AjoutDepense
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffredaffaireparjour/").get(ChiffreDaffaireParJours);

router.route("/chiffredaffaireparmois/").get(ChiffreDaffaireParMois);

router.route("/ajoutertypedepense/").get(AjoutTypeDeDepense);

router.route("/ajouterdepense/").get(AjoutDepense);


module.exports = router;