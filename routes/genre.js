const genreRoute = require("express").Router();
const { genreController } = require("../controller");

genreRoute.get("/", genreController.getGenres);
genreRoute.get("/add", genreController.addPage);
genreRoute.post("/add", genreController.addGenre);

module.exports = genreRoute;
