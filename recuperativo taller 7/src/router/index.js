const { Router } = require("express");
const { subidaImagen } = require("../middleware/multer");
const {
  Home,
  CrearNoticia,
  CrearAutor,
  CrearAutorPost,
  CrearNoticiaPost,
  NoticiaId,
  NoticiaEliminar,
  NoticiaEditar,
  NoticiaEditarPost,
} = require("../controller/controller");
const router = Router();
router.get("/", Home);
router.get("/noticia/:id", NoticiaId);
router.use("/noticia/eliminar/:id", NoticiaEliminar);
router.get("/noticia/editar/:id", NoticiaEditar);
router.post("/editar-noticia/:id", NoticiaEditarPost);
router.get("/crear-noticias", CrearNoticia);
router.post("/crear-noticias", subidaImagen.single("imagen"), CrearNoticiaPost);
router.get("/crear-autor", CrearAutor);
router.post("/crear-autor", CrearAutorPost);
module.exports = router;
