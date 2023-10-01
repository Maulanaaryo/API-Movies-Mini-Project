const genreRoute = require("express").Router();
const { genreController } = require("../controller");

genreRoute.get("/", genreController.getGenres);
genreRoute.get("/add", genreController.addPage);
genreRoute.post("/add", genreController.addGenre);
genreRoute.get("/update/:id", genreController.updatePage);
genreRoute.post("/update/:id", genreController.update);
genreRoute.get("/delete/:id", genreController.delete);
genreRoute.get("/:id/movies", genreController.getMovieGenres);

module.exports = genreRoute;
