const User = require("../models/User")
const connect = require("../db/connect");
const {
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const { SendMail } = require("../models/Mail");
const SECRET_KEY = "NOTESAPI"; //cle de securite ze tina atao fa tsy votery io NOTES... io

const maxAge = 3 * 24 * 60 * 60 * 1000;

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
        console.log(res.locals.user.id);
        User.find({}).then((result) => sendResult(res, result));
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

function sendResult(res, result) {
    return res.status(200).json({
        user: result,
        token:res.token
    });
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
                message: "Ce user n'existe pas"
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
        contact
    } = req.body;
    try {
        const existClient = await User.findOne({
            mail: mail
        });
        if (existClient) {
            return res.status(400).json({
                message: "address e-mail déjà utilisé"
            });
        }
        let idRole=new ObjectId('63c024436ebffd774a0fcb04');
        const hasshedPassord = await bcrypt.hash(mdp, 10);
        let role = await Role.findById(idRole).exec()
        // console.log(req.body);
        new User({
            nom: nom,
            prenom: prenom,
            mail: mail,
            mdp: hasshedPassord,
            contact: contact,
            role: idRole
        }).save().then(function (user) {
            console.log(user);
            SendMail(mail,"inscription garage mada","Bonjour "+ prenom+" "+nom +" !! votre inscription chez garage mada est terminée avec succès")
            const token = jwt.sign({
                mail: user.mail,
                id: user._id
            }, SECRET_KEY, {
                expiresIn: maxAge
            });
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge
            });
            res.status(201).json({
                nom: user.nom,
                prenom: user.prenom,
                mail: user.mail,
                token:token,
                role

            })
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Erreur d'inscription",
            error
        });
    }
}

const Login = async (req, res) => {
    const {
        mail,
        mdp
    } = req.body;
    try {
        const existClient = await User.findOne({
            mail: mail
        });
        if (!existClient) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }
        const verifMdp = await bcrypt.compare(mdp, existClient.mdp)
        if (!verifMdp) {
            return res.status(400).json({
                message: "mots de passe ou mail incorrecte"
            })
        }
        let idRole = new ObjectId(existClient.role);
        let role = await Role.findById(idRole).exec()
        const token = jwt.sign({
            mail: existClient.mail,
            id: existClient._id
        }, SECRET_KEY, {
            expiresIn: maxAge
        });
        res.cookie('jwt', token, {
            httpOnly: false,
            maxAge: maxAge
        });
        res.status(201).json({
            nom: existClient.nom,
            prenom: existClient.prenom,
            mail: existClient.mail,
            toke:token,
            role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Erreur dans votre code de connexion",
            error
        });
    }
}

const Logout = async (req, res) => {
    res.cookie("jwt", '', {
        maxAge: -1
    });
    res.redirect('/');
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