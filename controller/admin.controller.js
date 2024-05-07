const md5 = require("md5");

const adminModel = require("../models/index").admin;

// operation for load from databases

exports.getAllUser = async (request, response) => {
  /** call findAll() to get all data */
  let users = await adminModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All users have been loaded`,
  });
};

exports.getAdminById = async (request, response) => {
  const userId = request.params.id;

  try {
    const user = await adminModel.findOne({ where: { id: userId } });

    if (!user) {
      return response.status(404).json({
        success: false,
        message: `User with ID ${userId} not found`,
      });
    }

    return response.json({
      success: true,
      data: user,
      message: `User with ID ${userId} has been loaded`,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return response.status(500).json({
      success: false,
      message: "An error occurred while fetching user by ID",
    });
  }
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
