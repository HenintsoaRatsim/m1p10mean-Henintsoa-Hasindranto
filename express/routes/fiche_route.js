const express = require("express");
const { depotvoiture, ListeVoitureGarage, getHistorique } = require("../Service/Fiche_Service");
var router = express.Router();

router.route("/depotvoiture").post(depotvoiture);

router.route("/listevoituregarage").get(ListeVoitureGarage);

router.route("/listevoiturehistorique").get(getHistorique);

module.exports = router;
