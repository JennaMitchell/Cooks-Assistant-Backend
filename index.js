const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const recipeRoute = require("./routes/recipe-routes");
const authRoutes = require("./routes/auth");

const cors = require("cors");
console.log(12);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(22);
app.use(bodyParser.json());
console.log(34);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
console.log(34);
app.use(cors());
app.use(express.json());
app.use("/recipes", recipeRoute);
app.use("/auth", authRoutes);
app.listen(process.env.PORT, () => {});
