"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey: "order_id",
        as: `order_detail`,
      });
    }
  }
  order_list.init(
    {
      customer_nama: DataTypes.STRING,
      order_type: DataTypes.STRING,
      order_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "order_list",
    }
  );
  return order_list;
};
