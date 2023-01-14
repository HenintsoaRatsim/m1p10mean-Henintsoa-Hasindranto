const express = require("express");
const { getListeVoitureAReparer,AjoutReparation } = require("../Service/Atelier_Service");

var router = express.Router();

router.route("/getlistevoitureareparer").get(getListeVoitureAReparer);

router.route("/ajoutreparation").post(AjoutReparation);

module.exports = router;
