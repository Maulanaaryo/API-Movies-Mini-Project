const { genre, movieGenre, movie } = require("../models");

class GenreController {
  static async getGenres(req, res) {
    try {
      let genres = await genre.findAll({ order: [["id", "asc"]] });

      res.render("genre.ejs", { genres });
      // res.json(genres);
    } catch (e) {
      res.json(e);
    }
  }

  static addPage(req, res) {
    res.render("genre_add.ejs");
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

      res.render("genre_update.ejs", {
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

      res.redirect("/genres");

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
        include: [genre, movie],
      });

      let movies = result.map((element) => {
        return element.movie.dataValues;
      });

      let resultMG = {
        ...result[0].genre.dataValues,
        movies,
      };

      // console.log(resultMG);

      res.render("info_genre.ejs", { MG: resultMG });
      // res.json(resultMG);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = GenreController;
