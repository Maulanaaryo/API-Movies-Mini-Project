const { movie, genre, movieGenre } = require("../models");

class MovieController {
  static async getMovies(req, res) {
    try {
      let movies = await movie.findAll({
        include: [genre],
        order: [["id", "asc"]],
      });

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.render("movie/movie.ejs", { movies });
      } else {
        res.json(movies);
      }
    } catch (e) {
      res.json(e);
    }
  }

  static async addPage(req, res) {
    try {
      const genres = await genre.findAll();
      res.render("movie/movie_add.ejs", { genres });
    } catch (e) {
      res.json(e);
    }
  }

  static async addMovie(req, res) {
    try {
      const { name, image, year, rating, genreId } = req.body;
      const createdMovie = await movie.create({
        name,
        image,
        year,
        rating,
      });

      const movieId = createdMovie.id;
      await movieGenre.create({
        movieId,
        genreId,
      });

      res.redirect("/movies");
    } catch (e) {
      res.json(e);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;

      let result = await movie.findAll({
        where: { id },
        include: [genre],
      });

      let genres = await genre.findAll();
      res.render("movie/movie_update.ejs", {
        movie: result[0],
        genres: genres,
      });
    } catch (e) {
      res.json(e);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, image, year, rating, genreId } = req.body;

      const movieToUpdate = await movie.findByPk(id);

      await movieToUpdate.update({ name, image, year, rating });

      await movieGenre.update({ genreId }, { where: { movieId: id } });

      res.redirect("/movies");
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

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.redirect("/movies");
      } else {
        res.json(
          result === 1
            ? { message: `ID ${id} has been deleted` }
            : { message: `ID ${id} not found` }
        );
      }
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = MovieController;
