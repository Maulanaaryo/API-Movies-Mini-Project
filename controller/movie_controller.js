const { movie } = require("../models");

class MovieController {
  static async getMovies(req, res) {
    try {
      let movies = await movie.findAll();
      res.json(movies);
    } catch (e) {
      res.json(e);
    }
  }
  static addPage(req, res) {}

  static async addMovie(req, res) {
    try {
      const { name, image, year, rating } = req.body;

      let result = await movie.create({
        name,
        image,
        year,
        rating,
      });

      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = MovieController;
