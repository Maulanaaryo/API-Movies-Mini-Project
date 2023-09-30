"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movieGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movieGenre.belongsTo(models.movie, { foreignKey: "movieId" });
      movieGenre.belongsTo(models.genre, { foreignKey: "genreId" });
    }
  }
  movieGenre.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "MovieId can not be empty",
          },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "GenreId can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "movieGenre",
    }
  );
  return movieGenre;
};
