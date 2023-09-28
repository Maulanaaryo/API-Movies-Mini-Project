const { movieGenre, movie, genre } = require("../models");

class MovieGenreController {
  static async getMovieGenres(req, res) {
    try {
      let result = await movieGenre.findAll({
        order: [["id", "asc"]],
        include: [movie, genre],
      });
      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {}

  static async addMovieGenre(req, res) {
    try {
      const { movieId, genreId } = req.body;

      let result = await movieGenre.create({
        movieId: +movieId,
        genreId: +genreId,
      });

      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = MovieGenreController;
