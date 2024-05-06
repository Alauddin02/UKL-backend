const coffeModel = require("../models/index").coffe;

const orderModel = require("../models/index").order_list;

const detailModel = require("../models/index").order_detail;

const Op = require("sequelize").Op;

exports.order = async (request, response) => {
  let Data = {
    customer_nama: request.body.customer_nama,
    order_type: request.body.order_type,
    order_date: request.body.order_date,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orderModel
    .create(Data)
    .then((result) => {
      let order_id = result.id;

      let order_detail = request.body.order_detail;

      for (let i = 0; i < order_detail.length; i++) {
        order_detail[i].order_id = order_id;
      }
      detailModel
        .bulkCreate(order_detail)
        .then((result) => {
          return response.json({
            success: true,
            data: Data,
            message: "Berhasil menambahkan data Order dan Detail Order",
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.getOrder = async (request, response) => {
  let data = await orderModel.findAll({
    include: [
      {
        model: detailModel,
        as: `order_detail`,
        include: ["coffe"],
      },
    ],
  });
  return response.json({
    success: true,
    data: data,
    message: "Semua Order telah diperlihatkan",
  });
};
