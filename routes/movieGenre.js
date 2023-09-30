const movieGenreRoute = require("express").Router();
const { movieGenreController } = require("../controller");

movieGenreRoute.get("/", movieGenreController.getMovieGenres);
movieGenreRoute.get("/add", movieGenreController.addPage);
movieGenreRoute.post("/add", movieGenreController.addMovieGenre);
// movieGenreRoute.get("/update/:id", movieGenreController.updatePage);
// movieGenreRoute.post("/update/:id", movieGenreController.update);
// movieGenreRoute.get("/delete/:id", movieGenreController.delete);

module.exports = movieGenreRoute;
