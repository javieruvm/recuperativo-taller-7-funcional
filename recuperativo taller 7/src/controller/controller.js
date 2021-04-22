const Autores = require("../models/Autores");
const Noticias = require("../models/Noticias");
class Controller {
  async Home(req, res) {
    try {
      const noticias = await Noticias.find().populate("autor");
      res.render("pages/index.ejs", { noticias });
    } catch (error) {
      res.render("pages/index.ejs", {
        noticias,
        mensaje: "Ocurrio un error",
      });
    }
  }
  async NoticiaEliminar(req, res) {
    const { id } = req.params;
    await Noticias.findOneAndDelete({ _id: id });
    try {
      const noticias = await Noticias.find().populate("autor");
      res.render("pages/index.ejs", {
        noticias,
        mensaje: "Eliminado correctamente",
      });
    } catch (error) {
      res.render("pages/index.ejs", {
        noticias,
        mensaje: "Ocurrio un error eliminado",
      });
    }
  }
  async NoticiaEditar(req, res) {
    const { id } = req.params;
    try {
      const noticia = await Noticias.findOne({ _id: id });
      let autores = await Autores.find();
      if (!autores.length) {
        autores = [];
      }
      res.render("pages/editar", { noticia, autores });
    } catch (error) {
      res.render("pages/editar", { noticia: {}, autores: [] });
    }
  }
  async NoticiaEditarPost(req, res) {
    const { id } = req.params;
    const {
      titulo,
      subtitulo,
      autor,
      categoria,
      descripcion,
      fecha,
    } = req.body;
    try {
      const result = await Noticias.findOne({ _id: id });
      const autorResultado = await Autores.findOne({ nombre: autor });
      result.titulo = titulo;
      result.subtitulo = subtitulo;
      result.categoria = categoria;
      result.descripcion = descripcion;
      result.fecha = fecha;
      result.autor = autorResultado._id;
      await result.save();
      const noticias = await Noticias.find().populate("autor");
      res.render("pages/index.ejs", {
        noticias,
        mensaje: "Editado correctamente",
      });
    } catch (error) {
      res.render("pages/index.ejs", {
        noticias,
        mensaje: "Ocurrio un error ",
      });
    }
  }
  async NoticiaId(req, res) {
    const { id } = req.params;
    try {
      const noticia = await Noticias.findOne({ _id: id }).populate("autor");
      res.render("pages/noticia.ejs", { noticia });
    } catch (error) {
      res.redirect("/");
    }
  }
  async CrearNoticia(req, res) {
    try {
      let autores = await Autores.find();
      if (!autores.length) {
        autores = [];
      }
      res.render("pages/crear.ejs", { autores });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async CrearNoticiaPost(req, res) {
    const {
      titulo,
      subtitulo,
      autor,
      categoria,
      descripcion,
      fecha,
    } = req.body;
    const { filename } = req.file;
    try {
      const result = await Autores.findOne({ nombre: autor });
      const noticia = new Noticias({
        titulo,
        subtitulo,
        categoria,
        descripcion,
        fecha,
      });
      noticia.imagen = filename;
      noticia.autor = result._id;
      await noticia.save();
      const noticias = await Noticias.find();
      res.render("pages/index.ejs", { noticias });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  CrearAutor(req, res) {
    res.render("pages/crearAutor.ejs");
  }
  async CrearAutorPost(req, res) {
    const { nombre, pais, edad, genero } = req.body;
    try {
      const autor = new Autores({ nombre, pais, edad, genero });
      await autor.save();
      res.render("pages/crearAutor.ejs", {
        mensaje: "Autor creado correctamente",
      });
    } catch (error) {
      res.render("pages/crearAutor.ejs", {
        error: "Ha ocurrido un error creando el autor",
      });
    }
  }
}
module.exports = new Controller();
