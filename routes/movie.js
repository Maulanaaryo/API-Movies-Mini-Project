const movieRoute = require("express").Router();
const { movieController } = require("../controller");

movieRoute.get("/", movieController.getMovies);
movieRoute.get("/add", movieController.addPage);
movieRoute.post("/add", movieController.addMovie);
movieRoute.get("/update/:id", movieController.updatePage);
movieRoute.post("/update/:id", movieController.update);
movieRoute.get("/delete/:id", movieController.delete);

module.exports = movieRoute;
