const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     ChiffreDaffaire
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffredaffaire/").get(ChiffreDaffaire);


module.exports = router;