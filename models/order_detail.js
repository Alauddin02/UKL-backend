"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.order_list, {
        foreignKey: "order_id",
        as: "order_list",
      });
      this.belongsTo(models.coffe, {
        foreignKey: "coffe_id",
        as: "coffe",
      });
    }
  }
  order_detail.init(
    {
      order_id: DataTypes.INTEGER,
      coffe_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      total_akhir: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "order_detail",
    }
  );
  return order_detail;
};
