const User = require("../models/User")
const connect = require("../db/connect");
const {
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const SECRET_KEY = "NOTESAPI";//cle de securite ze tina atao fa tsy votery io NOTES... io

const AjoutUser = async (req, res) => {
    try {
        let user = new User(req.body.nom, req.body.prenom, req.body.mail, req.body.mdp);
        let result = await connect.db().collection("user").insertOne(user); //rehefa promes de asina await

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getAllUser = async (req, res) => {
    try {
        User.find({}).then((result)=>sendResult(res,result));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
function sendResult(res,result){
    res.status(200).json({user:result,token:res.token});
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
        let Nouv_mail = req.body.mail;
        let Nouv_mdp = req.body.mpd;

        let result = await connect.db().collection("user").updateOne({
            _id: id
        }, {
            $set: {
                nom: Nouv_nom,
                prenom: Nouv_prenom,
                mail: Nouv_mail,
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
    } = req.body;
    console.log(req.body)
    try {
        const existClient = await  User.findOne({
            mail: req.body.mail
        });
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
            contact: contact,
            role: new ObjectId('63c024436ebffd774a0fcb04')
        }).save();
        const token = jwt.sign({
            mail: u.mail,
            id: u.id
        }, SECRET_KEY);
        res.status(201).json({
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Erreur d'inscription"
        });
    }
}
const Login = async (req, res) => {
    const {
        mail,
        mdp
    } = req.body;
    try {
        const existClient = await  User.findOne({
            mail: req.body.mail
        });
        if (!existClient) {
            return res.status(404).json({
                message: "User introuvable"
            });
        }
        const verifMdp = await bcrypt.compare(mdp, existClient.mdp)
        if (!verifMdp) {
            return res.status(400).json({
                msg: "erreur veilliez verifier vos information de login"
            })
        }
        let idRole = new ObjectId(existClient.role);
        let role = await Role.findById(idRole).exec()
        const token = jwt.sign({
            mail: existClient.mail,
            id: existClient._id
        }, SECRET_KEY);
        res.status(201).json({
            token,
            nom:existClient.nom,
            prenom:existClient.prenom,
            mail:existClient.mail,
            role
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Erreur dans votre code de connexion"
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