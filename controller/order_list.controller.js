const { where } = require("sequelize");

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
    .then(async (result) => {
      let order_id = result.id;

      let order_detail = request.body.order_detail;

      //   for (let i = 0; i < order_detail.length; i++) {
      //     order_detail[i].order_id = order_id;
      //   }

      const newOrderDetails = await Promise.all(
        order_detail.map(async (detail) => {
          // Cari harga kopi dari model 'coffe'
          const coffee = await coffeModel.findOne({
            where: { id: detail.coffe_id },
          });
          if (!coffee) {
            throw new Error(`Kopi dengan ID ${detail.coffe_id} tidak ditemukan`);
          }

          // Hitung total harga dari quantity * price
          const total_price = detail.quantity * coffee.price;

          // Buat order_detail baru
          return {
            order_id: order_id,
            coffe_id: detail.coffe_id,
            quantity: detail.quantity,
            price: coffee.price, // Harga per unit kopi
            total_akhir: total_price, // Total harga dari kopi * quantity
          };
        })
      );

      //   await detailModel.bulkCreate(newOrderDetails);

      // Hitung total harga akhir dari semua detail pesanan
      //   const total_order_price = newOrderDetails.reduce((total, detail) => total + detail.total_price, 0);

      //   // Update total harga akhir dari pesanan
      //   await orderModel.update({ total_akhir: total_order_price }, { where: { id: order_id } });

      detailModel
        .bulkCreate(newOrderDetails)
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
      },
    ],
  });
  return response.json({
    success: true,
    data: data,
    message: "Semua Order telah diperlihatkan",
  });
};
