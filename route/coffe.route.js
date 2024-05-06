const express = require("express");

const app = express();

app.use(express.json());

const coffeController = require("../controller/coffe.controller");

const { authorize } = require("../controller/auth.controller");

app.get("/", coffeController.getCoffe);

app.post("coffe/", coffeController.findCoffe);

app.post("/", authorize, coffeController.addCoffe);

app.put("/:id", authorize, coffeController.updateCoffe);

app.delete("/:id", authorize, coffeController.deleteCoffe);

module.exports = app;
