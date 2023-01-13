
// const connect = require("../db/connect");
// const {
//     ObjectId
// } = require("mongodb");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fiche = require("../models/Fiche");
// const SECRET_KEY = "NOTESAPI";//cle de securite ze tina atao fa tsy votery io NOTES... io

// const AjoutUser = async (req, res) => {
//     try {
//         let user = new fiche(req.body.nom, req.body.prenom, req.body.mail, req.body.mdp);
//         let result = await connect.db().collection("user").insertOne(user); //rehefa promes de asina await

//         res.status(200).json(result);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }
