var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
const client_route = require("./routes/user_route");
const fiche_route = require("./routes/fiche_route");
const atelier_route = require("./routes/atelier_route");

const {connecter} = require("./db/connect");
const { Login } = require('./Service/User_Service');
// const auth = require('./middleware/auth');

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

// app.use("/api",auth);
app.use("/login",Login);
app.use("/api/user",client_route);
app.use("/api/garage",fiche_route);
app.use("/api/atelier",atelier_route);

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