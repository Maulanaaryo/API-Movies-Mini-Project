const { genre } = require("../models");

class GenreController {
  static async getGenres(req, res) {
    try {
      let genres = await genre.findAll();

      res.json(genres);
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {}

  static addGenre(req, res) {}
}

module.exports = GenreController;
