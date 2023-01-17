const express = require("express");
const { depotvoiture, ListeVoitureGarage, getHistorique, getFicheDetail } = require("../Service/Fiche_Service");
var router = express.Router();

router.route("/depotvoiture").post(depotvoiture);

router.route("/listevoituregarage").get(ListeVoitureGarage);

router.route("/listevoiturehistorique").get(getHistorique);

router.route("/getfichedetail/:idfiche").get(getFicheDetail);


module.exports = router;
