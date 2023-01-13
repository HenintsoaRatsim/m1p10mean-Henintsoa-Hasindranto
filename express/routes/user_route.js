const express = require("express");
const {
    Login,
    Logout,
    Inscription,
    AjoutUser,
    getAllUser,
    getUser,
    updateUser,
    deletUser,
} = require("../Service/User_Service");
var router = express.Router();
// rehefa find de atao tsika get 
// rehefa insertion de atao tika post


//http://localhost:3000/api/user/ajouteruser/ lien web service

router.route("/ajouteruser").post(AjoutUser);

router.route("/getalluser").get(getAllUser);

router.route("/getuser/:id").get(getUser);

router.route("/updatuser/:id").put(updateUser);

router.route("/deleteuser/:id").delete(deletUser);

router.route("/login").post(Login);

router.route("/logout").post(Logout);

router.route("/inscription").post(Inscription);

module.exports = router;