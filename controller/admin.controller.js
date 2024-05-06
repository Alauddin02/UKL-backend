const md5 = require("md5");

const adminModel = require("../models/index").admin;

// operation for load from databases
const Op = require(`sequelize`).Op;

exports.getAllUser = async (request, response) => {
  /** call findAll() to get all data */
  let users = await adminModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All users have been loaded`,
  });
};

exports.findUser = async (request, response) => {
  let keyword = request.params.key;

  let users = await adminModel.findAll({
    where: {
      [Op.or]: [{ id: { [Op.substring]: keyword } }, { name: { [Op.substring]: keyword } }, { email: { [Op.substring]: keyword } }, { role: { [Op.substring]: keyword } }],
    },
  });

  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

exports.addUser = async (request, response) => {
  let usernametmp = request.body.name;

  let userCheck = await adminModel.findOne({
    where: { name: usernametmp },
  });

  if (!userCheck) {
    let userdata = {
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password),
    };
    adminModel.create(userdata).then((result) => {
      return response.json({
        success: true,
        data: userdata,
        message: "Add User Succes",
      });
    });
  }
};

exports.updateUser = async (request, response) => {
  let dataAdmin = {
    name: request.body.name,
    email: request.body.email,
    password: md5(request.body.password),
  };
  if (request.body.passsword) {
    dataAdmin.password_user = md5(request.body.password_user);
  }

  let id = request.params.id;

  adminModel
    .update(dataAdmin, { where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deleteUser = async (request, response) => {
  let id = request.params.id;

  adminModel
    .destroy({ where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
