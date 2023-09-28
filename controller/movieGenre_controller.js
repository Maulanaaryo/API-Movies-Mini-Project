const { movieGenre, movie, genre } = require("../models");

class MovieGenreController {
  static async getMovieGenres(req, res) {
    try {
      let result = await movieGenre.findAll({
        order: [["id", "asc"]],
        include: [movie, genre],
      });
      res.render("movie_genre.ejs", { MG: result });
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {
    res.render("movie_genre_add.ejs");
  }

  static async addMovieGenre(req, res) {
    try {
      const { movieId, genreId } = req.body;

      const findMovie = await movie.findByPk(movieId);
      if (!findMovie) {
        throw {
          message: `Movie id not found`,
        };
      }

      const findGenre = await genre.findByPk(genreId);
      if (!findGenre) {
        throw {
          message: `Genre id not found`,
        };
      }

      let result = await movieGenre.create({
        movieId: +movieId,
        genreId: +genreId,
      });

      res.redirect("/movieGenres");
      // res.json(result);
    } catch (e) {
      res.json(e);
    }
  }

  // static async updatePage(req, res) {}

  // static async update(req, res) {}

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let result = await movieGenre.destroy({
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
}

module.exports = MovieGenreController;
