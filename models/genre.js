"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genre.belongsToMany(models.movie, {
        through: models.movieGenre,
        foreignKey: "genreId",
        otherKey: "movieId",
      });
    }
  }
  genre.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name can not be empty",
          },
        },
      },
    },
    { 
      sequelize,
      modelName: "genre",
    }
  );
  return genre;
};
