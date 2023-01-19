const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     AjoutTypeDeDepense,
     AjoutDepense,
     ChiffreAffaire,
     getDepense
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffreaffaire/").get(ChiffreAffaire);

router.route("/ajoutertypedepense/").get(AjoutTypeDeDepense);

router.route("/ajouterdepense/").get(AjoutDepense);

router.route("/getdepense/").get(getDepense);


module.exports = router;