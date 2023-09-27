"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movie.belongsToMany(models.genre, {
        through: models.movieGenre,
        foreignKey: "movieId",
        otherKey: "genreId",
      });
    }
  }
  movie.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name can not be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Image can not be empty",
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Year can not be empty",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Rating can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "movie",
    }
  );
  return movie;
};
