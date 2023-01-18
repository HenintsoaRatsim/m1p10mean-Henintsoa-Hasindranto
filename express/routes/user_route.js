const express = require("express");
const { ajouterRole } = require("../models/Role");
const {
    Login,
    Logout,
    Inscription,
    AjoutUser,
    getAllUser,
    getUser,
    updateUser,
    deletUser,
    DemmandeSortie,
    DemandeSortie,
} = require("../Service/User_Service");
var router = express.Router();


router.route("/ajouteruser").post(AjoutUser);

router.route("/getalluser").get(getAllUser);

router.route("/getuser/:id").get(getUser);

router.route("/updatuser/:id").put(updateUser);

router.route("/deleteuser/:id").delete(deletUser);

router.route("/login").post(Login);

router.route("/logout").post(Logout);

router.route("/ajouterrole").post(ajouterRole);

router.route("/inscription").post(Inscription);

router.route("/demandesortie/:idfiche").get(DemandeSortie);


module.exports = router;