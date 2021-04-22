const multer = require("multer");
const path = require("path");

const TIPO_EXTENSIONES = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const subidaImagen = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "../public/upload/"));
    },
    filename: function (req, file, callback) {
      const extension = TIPO_EXTENSIONES[file.mimetype];
      callback(null, Date.now() + "." + extension);
    },
    fileFilter: function (req, file, cb) {
      const extensionCorrecta = !!TIPO_EXTENSIONES[file.mimetype];
      const valid = extensionCorrecta
        ? null
        : new Error("El archivo que intenta subir no esta permitido");
      cb(valid, extensionCorrecta);
    },
  }),
});
module.exports = { subidaImagen };
