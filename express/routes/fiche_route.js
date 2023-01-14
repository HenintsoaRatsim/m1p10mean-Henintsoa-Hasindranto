const express = require("express");
const { depotvoiture, ListeVoitureGarage } = require("../Service/Fiche_Service");
var router = express.Router();

router.route("/depotvoiture").post(depotvoiture);

router.route("/listevoituregarage").get(ListeVoitureGarage);

module.exports = router;