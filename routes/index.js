const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({ message: "Welcome to Movies" });
});

const movieRoutes = require("./movie");
route.use("/movies", movieRoutes);

const genreRoutes = require("./genre");
route.use("/genres", genreRoutes);

const movieGenreRoutes = require("./moviegenre");
route.use("/movieGenres", movieGenreRoutes);

module.exports = route;
