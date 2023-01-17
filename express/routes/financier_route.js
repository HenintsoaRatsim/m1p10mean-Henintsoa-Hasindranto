const express = require("express");
const {
    ValiderSortie
} = require("../Service/Financier_Sevice");
var router = express.Router();

router.route("/validersortie/:idfiche").get(ValiderSortie);



module.exports = router;