const User = require("../models/User");
const connect = require("../db/connect");
const {
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const {
    SendMail
} = require("../models/Mail");
const {
    UpdateEtatFiche
} = require("./Atelier_Service");

const Fiche = require("../models/Fiche");
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
        token: res.token
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

function verifNull(res, input, message) {
    if (!input || input == "" || input == null || input == undefined || input === undefined || input === null || input.length === 0) {
        sendErreur(res, message)
        return true;
    }
    return false;
}

const Inscription = async (req, res) => {

    if (verifNull(res, req.body.nom, "ajouter un nom svp")) return;
    if (verifNull(res, req.body.prenom, "ajouter un prenom")) return;
    if (verifNull(res, req.body.mail, "ajouter un mail")) return;
    if (verifNull(res, req.body.mpd, "ajouter un mots de passe svp")) return;
    if (verifNull(res, req.body.contact, "ajouter un contact svp")) return;
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
            return res.status(200).json({
                message: "address e-mail déjà utilisé"
            });
        }
        let idRole = new ObjectId('63c7e2c18eb320722db1e0e8');
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
            SendMail(mail, "inscription garage mada", "Bonjour " + prenom + " " + nom + " !! votre inscription chez garage mada est terminée avec succès")
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
                token: token,
                role

            })
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: "Erreur d'inscription",
            error
        });
    }
}
function sendErreur(res, message) {
    return res.status(200).json({
        message: message
    })
}

const Login = async (req, res) => {
    console.log(req.body.mdp)
    if(verifNull(res,req.body.mail,"Veuillez inserer votre adresse e-mail svp")) return ;
    const {
        mail,
        mdp
    } = req.body;
    try {
        const existClient = await User.findOne({
            mail: mail
        });
        if (!existClient) {
            return res.status(200).json({
                message: "Utilisateur introuvable"
            });
        }
        const verifMdp = await bcrypt.compare(mdp, existClient.mdp)
        if (!verifMdp) {
            return res.status(200).json({
                message: "mots de passe ou mail incorrecte"
            })
        }
        let idRole = new ObjectId(existClient.role);
        let role = await Role.findById(idRole).exec()
        const token = jwt.sign({
            mail: existClient.mail,
            id: existClient._id,
            date: new Date()
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
            token: token,
            role
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
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

/**
 * Demande de sortie de voiture
 * update etat fiche to 4
 * @param {*} res 
 * @param {*} req 
 */

const DemandeSortie = async (req, res) => {
    if (req.params.idfiche) {
        let idfiche = new ObjectId(req.params.idfiche);
        
        Fiche.findOne({
        _id: idfiche
    }).then(function (fiche) {
        if(fiche.etatpayement==0)return res.status(200).json("Votre facture doit être payée avant de pouvoir effectuer une demande de sortie");
        UpdateEtatFiche(idfiche, 4);
        res.status(200).json({
            message: "Votre Demande de sortie est envoyé"
        });
    })
    } else {
        res.status(200).json({
            message: "Impossible ajouter un id svp"
        });
    }

}



module.exports = {
    AjoutUser,
    getAllUser,
    getUser,
    updateUser,
    deletUser,
    Login,
    Logout,
    Inscription,
    DemandeSortie
}