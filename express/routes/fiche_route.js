const express = require("express");
const { depotvoiture } = require("../Service/Fiche_Service");
var router = express.Router();

router.route("/depotvoiture").post(depotvoiture);

module.exports = router;