const { genre, movieGenre, movie } = require("../models");

class GenreController {
  static async getGenres(req, res) {
    try {
      let genres = await genre.findAll({ order: [["id", "asc"]] });

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.render("genre/genre.ejs", { genres });
      } else {
        res.json(genres);
      }
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {
    res.render("genre/genre_add.ejs");
  }

  static async addGenre(req, res) {
    try {
      const { name } = req.body;

      let result = await genre.create({
        name,
      });

      res.redirect("/genres");
    } catch (e) {
      res.json(e);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;

      let result = await genre.findAll({
        where: { id },
      });

      res.render("genre/genre_update.ejs", {
        genre: result[0],
      });
    } catch (e) {
      res.json(e);
    }
  }

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

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.redirect("/genres");
      } else {
        res.json(
          result[0] === 1
            ? { message: `ID ${id} has been updated` }
            : { message: `ID ${id} not found` }
        );
      }
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

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.redirect("/genres");
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

  static async getMovieGenres(req, res) {
    try {
      const id = +req.params.id;

      let result = await movieGenre.findAll({
        where: {
          genreId: id,
        },
        include: [genre, movie],
      });

      let movies = result.map((element) => {
        return element.movie.dataValues;
      });

      let resultMG = {
        ...result[0].genre.dataValues,
        movies,
      };

      const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.render("genre/info_genre.ejs", { MG: resultMG });
      } else {
        res.json(resultMG);
      }
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = GenreController;
