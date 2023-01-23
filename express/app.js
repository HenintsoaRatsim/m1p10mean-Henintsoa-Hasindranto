var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const client_route = require("./routes/user_route");
const fiche_route = require("./routes/fiche_route");
const atelier_route = require("./routes/atelier_route");
const financier_route = require("./routes/financier_route");
const facture_route = require("./routes/facture_route");
const {
  connecter
} = require("./db/connect");
const {
  Login,
  Inscription
} = require('./Service/User_Service');
const auth = require('./middleware/auth');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./db/mongooseconnect");

app.use("/api", auth);
app.use("/login", Login);
app.use("/inscription", Inscription);
app.use("/api/user", client_route);
app.use("/api/garage", fiche_route);
app.use("/api/atelier", atelier_route);
app.use("/api/financier", financier_route);
app.use("/api/facture", facture_route);

// app.get('/profil/:id',function(req,res){
// res.send("id est ="+req.params)
// })


// A faire redirect Login click sur le lien login de mila makaty am back alo zany ny any am angular

connecter("mongodb+srv://henintsoa:wi0VByNKAQxLq3YF@cluster0.25yd0bh.mongodb.net/?retryWrites=true&w=majority", (erreur) => {
  if (erreur) {
    console.log("erreur lors de la connexion avec la base de données");
    console.log(erreur);
    process.exit(-1)
  } else {
    console.log("Connexion avec la base de données établie");
  }
})

module.exports = app;

/**
 * 
 * https://api-mean.onrender.com/
 * 
 * api-mean
 */