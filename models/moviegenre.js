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
      movieGenre.belongsTo(models.movie);
      movieGenre.belongsTo(models.genre);
    }
  }
  movieGenre.init(
    {
      movieId: DataTypes.STRING,
      genreId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "movieGenre",
    }
  );
  return movieGenre;
};
