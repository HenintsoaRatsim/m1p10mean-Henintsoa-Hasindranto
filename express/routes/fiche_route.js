const express = require("express");
const { depot } = require("../controller/ficheCtrl");
var router = express.Router();

router.route("/test").post(depot);

module.exports = router;