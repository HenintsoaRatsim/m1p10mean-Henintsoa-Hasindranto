const { Client } = require("../models/client")
const connect= require("../db/connect")
const ajouterClient = async (req,res)=>{
    try{
        let client = new Client(req.body.nom,req.body.prenom,req.body.email,req.body.mdp);
        let result = await connect.db().collection("client").insertOne(client); //rehefa promes de asina await

        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const getAllClient = async (req,res)=>{
    try {
        let cursor = connect.db().collection("client").find();
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result)
        }
        else{
            res.status(204).json({msg: "Aucun client trouvé"}) // 204 midika fa recu le requete fa vide ny valiny
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = {ajouterClient,getAllClient}