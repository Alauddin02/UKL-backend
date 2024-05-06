"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class coffe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey: "coffe_id",
        as: `order_detail`,
      });
    }
  }
  coffe.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.ENUM("M,L,XL"),
      price: DataTypes.DOUBLE,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "coffe",
    }
  );
  return coffe;
};
