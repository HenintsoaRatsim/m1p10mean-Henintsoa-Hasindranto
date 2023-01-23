const express = require("express");
const {
     ValiderPaiement,
     getTempsMoyenneReparationVoiture,
     AjoutTypeDeDepense,
     AjoutDepense,
     ChiffreAffaire,
     getBenefice,
     getListeVoiturePaiement,
     getlistevoitureTempsMoyenne,
     getTypeDeDepense,
     getListeDepense,
     Rechereche
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validerpaiement/").post(ValiderPaiement);

router.route("/gettempsmoyenne/:idfiche").get(getTempsMoyenneReparationVoiture);

router.route("/chiffreaffaire").post(ChiffreAffaire);

router.route("/ajoutertypedepense/").post(AjoutTypeDeDepense);

router.route("/gettypedepense/").get(getTypeDeDepense);

router.route("/ajouterdepense/").post(AjoutDepense);

router.route("/getlistedepense/").get(getListeDepense);

router.route("/getBenefice/").post(getBenefice);

router.route("/recherche/").post(Rechereche);

router.route("/getlistevoiturepaiement/").get(getListeVoiturePaiement);

router.route("/getlistevoituretempsmoyenne/").get(getlistevoitureTempsMoyenne);



module.exports = router;