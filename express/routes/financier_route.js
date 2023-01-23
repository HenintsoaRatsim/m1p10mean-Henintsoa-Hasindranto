const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     AjoutTypeDeDepense,
     AjoutDepense,
     ChiffreAffaire,
     getDepense,
     getListeVoiturePaiement,
     getlistevoitureTempsMoyenne,
     getTypeDeDepense,
     getListeDepense
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffreaffaire").post(ChiffreAffaire);

router.route("/ajoutertypedepense/").get(AjoutTypeDeDepense);

router.route("/gettypedepense/").get(getTypeDeDepense);

router.route("/ajouterdepense/").get(AjoutDepense);

router.route("/getlistedepense/").get(getListeDepense);

router.route("/getdepense/").get(getDepense);


router.route("/getlistevoiturepaiement/").get(getListeVoiturePaiement);

router.route("/getlistevoituretempsmoyenne/").get(getlistevoitureTempsMoyenne);



module.exports = router;