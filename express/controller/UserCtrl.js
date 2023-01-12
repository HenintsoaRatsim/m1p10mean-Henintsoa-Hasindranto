const User = require("../models/user")
const connect = require("../db/connect");
const {
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const AjoutUser = async (req, res) => {
    try {
        let user = new User(req.body.nom, req.body.prenom, req.body.email, req.body.mdp);
        let result = await connect.db().collection("user").insertOne(user); //rehefa promes de asina await

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getAllUser = async (req, res) => {
    try {
        let cursor = User.find();
        // let cursor = connect.db().collection("user").find();
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(204).json({
                msg: "Aucun utilisateur trouvé"
            }) // 204 midika fa recu le requete fa vide ny valiny
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getUser = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let cursor = connect.db().collection("user").find({
            _id: id
        }, {
            prenom: 0
        });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result[0])
        } else {
            res.status(204).json({
                msg: "Ce user n'existe pas"
            }) // 204 midika fa recu le requete fa vide ny valiny
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const updateUser = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let Nouv_nom = req.body.nom;
        let Nouv_prenom = req.body.prenom;
        let Nouv_email = req.body.email;
        let Nouv_mdp = req.body.mpd;

        let result = await connect.db().collection("user").updateOne({
            _id: id
        }, {
            $set: {
                nom: Nouv_nom,
                prenom: Nouv_prenom,
                email: Nouv_email,
                mdp: Nouv_mdp
            }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deletUser = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);

        let result = await connect.db().collection("user").deleteOne({
            _id: id
        })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const Inscription = async (req, res) => {
    const {
        nom,
        prenom,
        mail,
        mdp,
        contact,
        role
    } = req.body;
    try {
        const existClient = await  User.findOne({
            mail: req.body.mail
        });
        console.log(existClient);
        if (existClient) {
            return res.status(400).json({
                message: "address e-mail déjà utilisé"
            });
        }
        const hasshedPassord = await bcrypt.hash(mdp, 10);
        // console.log(req.body);
        let u = await new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            mail: req.body.mail,
            mdp: hasshedPassord,
            contact: contact
        }).save();
        const token = jwt.sign({
            mail: u.mail,
            id: u.id
        }, SECRET_KEY);
        res.status(201).json({
            user: u,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Erreur inscription"
        });
    }
}
const Login = async (req, res) => {
    const {
        email,
        mdp
    } = req.body;
    try {
        const existClient = await connect.db().collection("user").findOne({
            email: email
        });
        console.log(email);
        if (!existClient) {
            return res.status(404).json({
                message: "User introuvable"
            });
        }
        const verifMdp = await bcrypt.compare(mdp, existClient.mdp)
        if (!verifMdp) {
            return res.status(400).json({
                msg: "erreur lors de la connexion "
            })
        }
        const token = jwt.sign({
            email: existClient.email,
            id: existClient._id
        }, SECRET_KEY);
        res.status(201).json({
            user: existClient,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Erreur  connexion"
        });
    }
}

const Logout = async (req, res) => {

}

module.exports = {
    AjoutUser,
    getAllUser,
    getUser,
    updateUser,
    deletUser,
    Login,
    Logout,
    Inscription
}