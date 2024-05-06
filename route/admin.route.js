const express = require("express");

const app = express();

app.use(express.json());

const adminController = require("../controller/admin.controller");

const { authenticate } = require("../controller/auth.controller");

app.get("/getUser", adminController.getAllUser);

app.post("/addAdmin", adminController.addUser);

app.post("/find", adminController.findUser);

app.post("/Edit", adminController.updateUser);

app.post("/auth", authenticate);

module.exports = app;
