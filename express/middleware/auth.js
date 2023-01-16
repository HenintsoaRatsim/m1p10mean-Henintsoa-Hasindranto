
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function redirectLogin(res){
    return res.redirect('https://www.google.com');
}
module.exports = (req,res,next)=>{
    try {
        // const token= req.body.token;
        const token= req.headers.authorization.split(" ")[1];
        req.iduser = jwt.verify(token,"NOTESAPI").id;
        // req.token=token;
        // res.json({"token": token});
        res.token = token;
        // const token =req.cookies.jwt;
        // if(token){
        //     jwt.verify(token,"NOTESAPI",async(err,decodedToken)=>{
        //         if(err){
        //             res.locals.user =null;
        //             res.cookies("jwt",'',{maxAge:1});
        //             redirectLogin();
        //             // return res.status(200).json({message :"token invalide",err})
        //         }
        //         else{
        //             let user = await User.findById(decodedToken.id);
        //             res.locals.user =user;
        //             console.log("vous etes connecté");
        //             next();
        //         }
        //     })
        // }
        // else {
        //     redirectLogin(res);
        //     // return res.status(404).json({msg: "vous n'etes pas connecté"})
        // }
    } catch (error) {
        console.log(error);
        return res.status(200).json({message :"token invalide",error})
    }
}