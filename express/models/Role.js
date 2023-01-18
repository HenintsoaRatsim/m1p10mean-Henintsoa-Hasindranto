const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    intitule: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Role", RoleSchema);

const ajouterRole = async (req, res) => {
    let role = {
        intitule: req.body.intitule,
    }
    mongoose.model("Role", RoleSchema)(role).save().then((result) => {
        console.log(result)
    }).catch((err) => {

    });
}
module.exports = {
    ajouterRole,
}