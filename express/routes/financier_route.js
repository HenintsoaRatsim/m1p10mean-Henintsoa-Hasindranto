const express = require("express");
const {
     ValiderPaiement, getTempsMoyenneReparationVoiture
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/:idfiche").get(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);


module.exports = router;