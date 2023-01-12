const Role = require("../models/role");
const fiche = require("../models/fiche")

const depot = async (req,res)=>{
    try {
        const depot = new Role({intitule: "Responsable financier"});
        depot.save().then(() => console.log('client go'));;
    } catch (error) {
        
    }
}

module.exports ={
    depot
}