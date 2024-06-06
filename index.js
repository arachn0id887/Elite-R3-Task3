const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const article = require("./articleResources");
app.set("view engine", "ejs");
const userRouter = require("./routes.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/", userRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://vivaanjha:JFpM9GOh6oj9k8Tt@elite-r3-task3-crudapi.ahs5hb4.mongodb.net/Elite-R3-Task3-CRUDAPI?retryWrites=true&w=majority&appName=Elite-R3-Task3-CRUDAPI"
  )
  .then(() => {
    console.log("MongoDB is connected.");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
