const express = require("express");

const app = express();

app.use(express.json());

const adminController = require("../controller/admin.controller");

const { authenticate } = require("../controller/auth.controller");

app.post("/auth", authenticate);

app.get("/", adminController.getAllUser);

app.get("/:id", adminController.getAdminById);

app.post("/add", adminController.addUser);

app.post("/Edit", adminController.updateUser);



module.exports = app;
