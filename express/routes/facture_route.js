const express = require("express");
const { getFacture } = require("../Service/Facture_Servie");
var router = express.Router();

router.route("/getfacture/:idfiche").get(getFacture);

module.exports = router;
