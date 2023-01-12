const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://henintsoa:wi0VByNKAQxLq3YF@cluster0.25yd0bh.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Mongoose connecté");
  })
  .catch((err) => console.log(err));