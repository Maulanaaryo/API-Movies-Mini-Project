const route = require("express").Router();

route.get("/", (req, res) => {
  // res.json({ message: "Welcome to Movies" });

  res.render("index.ejs");
});

const movieRoutes = require("./movie");
route.use("/movies", movieRoutes);

const genreRoutes = require("./genre");
route.use("/genres", genreRoutes);

const movieGenreRoutes = require("./movieGenre");
route.use("/movieGenres", movieGenreRoutes);

module.exports = route;
