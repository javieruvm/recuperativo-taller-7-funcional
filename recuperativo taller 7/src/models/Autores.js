const { Schema, model } = require("mongoose");

const AutorSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  pais: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
});

module.exports = model("Autor", AutorSchema);
