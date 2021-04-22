const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { connectDB } = require("./database/connection");
const router = require("./router/index");
const app = express();

app.set("puerto", process.env.PUERTO || 8080);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(app.get("puerto"), () => {
  console.log(
    `Servidor escuchando por peticiones en el puerto:${app.get("puerto")}`
  );
  connectDB();
});
