const { movieGenre, movie, genre } = require("../models");

class MovieGenreController {
  static async getMovieGenres(req, res) {
    try {
      let result = await movieGenre.findAll({
        order: [["id", "asc"]],
        include: [movie, genre],
      });

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.render("moviegenre/movie_genre.ejs", { MG: result });
      } else {
        res.json(result);
      }
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {
    res.render("moviegenre/movie_genre_add.ejs");
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

  // static async delete(req, res) {}
}

module.exports = MovieGenreController;
