const { Schema, model, Types } = require("mongoose");

const NoticiasSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  subtitulo: {
    type: String,
    required: true,
  },
  autor: {
    type: Types.ObjectId,
    ref: "Autor",
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: () => Date.now(),
  },
  imagen: {
    type: String,
    required: true,
  },
});

module.exports = model("Noticia", NoticiasSchema);
