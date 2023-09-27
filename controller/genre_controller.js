const { genre, movieGenre, movie } = require("../models");

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

  static async addGenre(req, res) {
    try {
      const { name } = req.body;

      let result = await genre.create({
        name,
      });

      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }

  static updatePage(req, res) {}

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name } = req.body;

      let result = await genre.update(
        { name },
        {
          where: { id },
        }
      );

      result[0] === 1
        ? res.json({
            message: `ID ${id} has been updated`,
          })
        : res.json({
            message: `ID ${id} not found`,
          });
    } catch (e) {
      res.json(e);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let result = await genre.destroy({
        where: { id },
      });

      result === 1
        ? res.json({
            message: `ID ${id} has been deleted`,
          })
        : res.json({
            message: `ID ${id} not found`,
          });
    } catch (e) {
      res.json(e);
    }
  }

  static async getMovieGenres(req, res) {
    try {
      const id = +req.params.id;

      let result = await movieGenre.findAll({
        where: {
          genreId: id,
        },
      });

      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = GenreController;
