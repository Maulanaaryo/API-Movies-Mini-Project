const movieGenreRoute = require("express").Router();
const { movieGenreController } = require("../controller");

movieGenreRoute.get("/", movieGenreController.getMovieGenres);
movieGenreRoute.get("/add", movieGenreController.addPage);
movieGenreRoute.post("/add", movieGenreController.addMovieGenre);

module.exports = movieGenreRoute;
