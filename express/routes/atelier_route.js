const express = require("express");
const {
    getListeVoitureAReparer,
    AjoutReparation,
    AjouterAvancement,
    ReceptionnerVoiture,
    ValiderSortie,
    getDemandeSortie,
    getListeVoituReceptionner
} = require("../Service/Atelier_Service");

var router = express.Router();

router.route("/getlistevoitureareparer").get(getListeVoitureAReparer);

router.route("/getlistevoiturereceptionner").get(getListeVoituReceptionner);

router.route("/ajoutreparation").post(AjoutReparation);

router.route("/ajouteravancement").post(AjouterAvancement);

router.route("/receptionnervoiture/:idfiche").get(ReceptionnerVoiture);

router.route("/validersortie/:idfiche").get(ValiderSortie);

router.route("/getdemandesortie/").get(getDemandeSortie);


module.exports = router;