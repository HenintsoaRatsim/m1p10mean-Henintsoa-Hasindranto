const express = require("express");
const { getListeVoitureAReparer,AjoutReparation, AjouterAvancement, ReceptionnerVoiture } = require("../Service/Atelier_Service");

var router = express.Router();

router.route("/getlistevoitureareparer").get(getListeVoitureAReparer);

router.route("/ajoutreparation").post(AjoutReparation);

router.route("/ajouteravancement").post(AjouterAvancement);

router.route("/receptionnervoiture").post(ReceptionnerVoiture);

// router.route("/finirreparation").post(CommencerReparation);

module.exports = router;
