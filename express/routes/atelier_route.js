const express = require("express");
const {
    getListeVoitureAReparer,
    AjoutReparation,
    AjouterAvancement,
    ReceptionnerVoiture,
    ValiderSortie,
    getListeVoitureReparationFini,
    getListeVoituReceptionner,
    getVoitureEnReparation
} = require("../Service/Atelier_Service");

var router = express.Router();

router.route("/getlistevoitureareparer").get(getListeVoitureAReparer);

router.route("/getlistevoiturereceptionner").get(getListeVoituReceptionner);

router.route("/ajoutreparation").post(AjoutReparation);

router.route("/ajouteravancement").post(AjouterAvancement);

router.route("/receptionnervoiture/:idfiche").get(ReceptionnerVoiture);

router.route("/getvoitureenreparation/").get(getVoitureEnReparation);

router.route("/getvoiturereparationfini/").get(getListeVoitureReparationFini);

router.route("/validerbondesortie/:idfiche").get(ValiderSortie);

module.exports = router;