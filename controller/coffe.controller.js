const coffemodel = require("../models/index").coffe;

const auth = require("../middleware/auth")

const path = require("path");

const Op = require("sequelize").Op;

const fs = require("fs");

exports.getCoffe = async (request, response) => {
  /** call findAll() to get all data */
  let coffe = await coffemodel.findAll();
  return response.json({
    success: true,
    data: coffe,
    message: `All users have been loaded`,
  });
};

exports.getCoffeById = async (request, response) => {
  const menuId = request.params.id;

  try {
    const menu = await coffemodel.findOne({ where: { id: menuId } });

    if (!menu) {
      return response.status(404).json({
        success: false,
        message: `menu with ID ${menuId} not found`,
      });
    }

    return response.json({
      success: true,
      data: menu,
      message: `menu with ID ${menuId} has been loaded`,
    });
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    return response.status(500).json({
      success: false,
      message: "An error occurred while fetching menu by ID",
    });
  }
};

const upload = require("../controller/upload-image-coffe").single(`image`);

exports.addCoffe = async (request, response) => {
  upload(request, response, async (error) => {
    /** check if there are error when upload */
    if (error) {
      return response.json({ message: error });
    }
    /** check if file is empty */
    if (!request.file) {
      return response.json({
        message: `Nothing to Upload`,
      });
    }

    let coffeData = {
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
      image: request.file.filename,
    };
    coffemodel.create(coffeData).then((result) => {
      return response.json({
        success: true,
        data: coffeData,
        message: "Add Coffe Succes",
      });
    });
  });
};

exports.updateCoffe = async (request, response) => {
  upload(request, response, async (error) => {
    /** check if there are error when upload */
    if (error) {
      return response.json({ message: error });
    }
    const id = request.params.id;

    let coffeData = {
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
    };
    if (request.file) {
      const selectedCoffe = coffemodel.findOne({
        where: { id: id },
      });

      if (selectedCoffe && selectedCoffe.coffe) {
        const oldImage = selectedCoffe.coffe;
        const pathImage = path.join(__dirname, `../coffe`, oldImage);

        if (fs.existsSync(pathImage)) {
          fs.unlink(pathImage, (error) => {
            if (error) {
              console.log("error deleting", error);
            }
          });
        }
      }
      coffeData.image = request.file.filename;
      coffeData.createdAt = new Date();
      coffeData.updatedAt = new Date();
    }

    coffemodel
      .update(coffeData, {
        where: { id: id },
      })
      .then((result) => {
        return response.json({
          success: true,
          data: coffeData,
          message: "update Coffe Succes",
        });
      })
      .catch((error) => {
        /** if update's process fail */
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deleteCoffe = async (request, response) => {
  const id = request.params.id;
  const coffe = await coffemodel.findOne({
    where: { id: id },
  });

  const oldImage = coffe.image;

  console.log(oldImage);

  const pathImage = path.join(__dirname, `../coffe`, oldImage);

  if (fs.existsSync(pathImage)) {
    fs.unlink(pathImage, (error) => console.log(error));
  }

  coffemodel
    .destroy({
      where: { id: id },
    })
    .then((result) => {
      return response.json({
        success: true,
        message: "delete Coffe Succes",
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
