const fiche = require("../models/fiche")

const depot = async (req,res)=>{
    try {
        const depot = new fiche({intitule: "hhh"});
        depot.save().then(() => console.log('meow'));;
    } catch (error) {
        
    }
}

module.exports ={
    depot
}