
const { ObjectId } = require("mongodb");
const { UpdateEtatFiche } = require("./Atelier_Service");

/**
 * Demmande de sortie de voiture
 * update etat fiche to 4
 * @param {*} res 
 * @param {*} req 
 */
const ValiderSortie = async (req,res)=>{
    let idfiche = new ObjectId(req.params.idfiche);
    UpdateEtatFiche(idfiche, 5);
    res.status(200).json({message: "La demande de sortie est validé."});
}

module.exports ={
    ValiderSortie
}
