const express = require("express");
const {  Login, Logout, Inscription, AjoutUser, getAllUser, getUser, updateUser, deletUser } = require("../controller/UserCtrl");
var router = express.Router();
// rehefa find de atao tsika get 
// rehefa insertion de atao tika post


//http://localhost:3000/api/client/ajouterclient/ lien web service
router.route("/ajouteruser").post(AjoutUser);

router.route("/getalluser").get(getAllUser);

router.route("/getuser/:id").get(getUser);

router.route("/updatuser/:id").put(updateUser);

router.route("/deleteuser/:id").delete(deletUser);

router.route("/login").get(Login);
router.route("/logout").post(Logout);
router.route("/inscription").post(Inscription);

module.exports = router;