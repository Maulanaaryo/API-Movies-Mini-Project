const { movie, genre, movieGenres } = require("../models");

class MovieController {
  static async getMovies(req, res) {
    try {
      let movies = await movie.findAll();
      res.render("movie.ejs", { movies });
      // res.json(movies);
    } catch (e) {
      res.json(e);
    }
  }
  static addPage(req, res) {
    res.render("movie_add.ejs");
  }

  static async addMovie(req, res) {
    try {
      const { name, image, year, rating } = req.body;

      let result = await movie.create({
        name,
        image,
        year,
        rating,
      });

      res.redirect("/movies");
      // res.json(result)
    } catch (e) {
      res.json(e);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;

      let result = await movie.findAll({
        where: { id },
      });

      res.render("movie_update.ejs", {
        movie: result[0],
      });
    } catch (e) {
      res.json(e);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, image, year, rating } = req.body;

      let result = await movie.update(
        { name, image, year, rating },
        {
          where: { id },
        }
      );

      res.redirect("/movies");

      // result[0] === 1
      //   ? res.json({
      //       message: `ID ${id} has been updated`,
      //     })
      //   : res.json({
      //       message: `ID ${id} not found`,
      //     });
    } catch (e) {
      res.json(e);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let result = await movie.destroy({
        where: { id },
      });

      res.redirect("/movies", { result });

      // result === 1
      //   ? res.json({
      //       message: `ID ${id} has been deleted`,
      //     })
      //   : res.json({
      //       message: `ID ${id} not found`,
      //     });
    } catch (e) {
      res.json(e);
    }
  }

  static async getShowMovies(req, res) {
    try {
      const id = +req.params.id;

      let result = await movieGenres.findAll({
        where: {
          movieId: id,
          genreId: id,
        },
        include: [movie, genre],
      });

      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = MovieController;
