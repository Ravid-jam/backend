var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());
require("dotenv").config();
// view engine setup
var mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.ozdxf.mongodb.net/chat")
  .then(() => console.log("MongoDB Successfully Connected"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({
    message: "Hello , welcome to backend",
    status: 200,
  });
});

module.exports = app;
