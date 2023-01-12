var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const MongoClient = require('mongodb').MongoClient
const client_route = require("./routes/user_route");
const fiche_route = require("./routes/fiche_route");
const {connecter} = require("./db/connect")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const auth = require('./middleware/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./db/mongooseconnect");

// app.use(auth);
app.use("/api/user",client_route);
app.use("/api/depot",fiche_route);

connecter("mongodb+srv://henintsoa:wi0VByNKAQxLq3YF@cluster0.25yd0bh.mongodb.net/?retryWrites=true&w=majority", (erreur) => {
  if (erreur) {
    console.log("erreur lors de la connexion avec la base de données");
    console.log(erreur);
    process.exit(-1)
  } else {
    console.log("Connexion avec la base de données étableie");
  }
})

module.exports = app;