const { validationResult, body } = require("express-validator");

const validateCustomer = [
  body("customer_nama").notEmpty().withMessage("nama tidak boleh kosong"),
  body("order_type").notEmpty().withMessage("jenis order tidak boleh kosong"),
  body("order_Date").notEmpty().withMessage("tanggal tidak boleh kosong"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      let ermessage = errors
        .array()
        .map((it) => it.msg)
        .join(",");
      return response.status(422).json({
        success: false,
        message: ermessage,
      });
    }
    next();
  },
];

module.exports = { validateCustomer };
