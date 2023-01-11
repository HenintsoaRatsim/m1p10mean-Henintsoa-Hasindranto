const express = require("express");
const { ajouterClient } = require("../controller/ClientCtrl");
var router = express.Router();

//http://localhost:3000/api/v1/client/ lien web service
router.route("/ajouterclient").post(ajouterClient);

module.exports = router;