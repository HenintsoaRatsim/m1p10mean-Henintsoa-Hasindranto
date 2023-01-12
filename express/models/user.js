class User{
    constructor(nom,prenom,email,mdp,etat){
        this.nom=nom;
        this.prenom=prenom;
        this.email =email;
        this.mdp =mdp;
        this.etat =0;//client 1,
    }
}

module.exports = {User};