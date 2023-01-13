
const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try {
        const token= req.body.token;
        // const token= req.headers.authorization.split(" ")[1];
        // req.iduser = jwt.verify(token,"NOTESAPI").id;
        // req.token=token;
        console.log(token);
        res.json({"token": token});
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message :"token invalide"})
    }
}