const express = require(`express`);
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const cors = require(`cors`);

app.use(cors());

const adminRoute = require("./route/admin.route");
app.use("/admin", adminRoute);

const coffeRoute = require("./route/coffe.route");
app.use("/coffe", coffeRoute);

const orderRoute = require("./route/order_list.route");
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server of coffe runs on port ${PORT}`);
});
