const express = require("express");

const app = express();

app.use(express.json());

const order_listController = require("../controller/order_list.controller");

const { authorize } = require("../controller/auth.controller");

app.post("/", order_listController.order);

app.get("/", authorize, order_listController.getOrder);

module.exports = app;
