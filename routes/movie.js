const movieRoute = require("express").Router();
const { movieController } = require("../controller");

movieRoute.get("/", movieController.getMovies);
movieRoute.get("/add", movieController.addPage);
movieRoute.post("/add", movieController.addMovie);

module.exports = movieRoute;
