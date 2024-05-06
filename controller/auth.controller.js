const md5 = require("md5");

const adminModel = require("../models/index").admin;

const jwt = require("jsonwebtoken");

const secret = "moklet";

const authenticate = async (request, response) => {
  let dataLogin = {
    email: request.body.email,
    password: md5(request.body.password),
  };
  let dataUser = await adminModel.findOne({ where: dataLogin });

  if (dataUser) {
    let payload = JSON.stringify(dataUser);
    console.log(payload);

    let tkn = jwt.sign(payload, secret);

    return response.json({
      success: true,
      logged: true,
      message: "berhasil login",
      tokenS: tkn,
      data: dataUser,
    });
  }
  return response.json({
    success: false,
    logged: false,
    message: "Invalid username dan password",
  });
};

const authorize = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    let verivedUser;
    try {
      verivedUser = jwt.verify(token, secret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return response.status(400).json({
          message: "token expired",
          err: error,
        });
      }
      return response.status(400).json({
        message: "Auth Invalid",
        err: error,
      });
    }
    request.user = verivedUser;
    next();
  } else {
    return response.json({
      success: false,
      auth: false,
      message: "User Unauthorize",
    });
  }
};

module.exports = { authenticate, authorize };
