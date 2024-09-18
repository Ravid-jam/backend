var express = require("express");
var router = express.Router();

var userController = require("../controller/RegisterUser");
var verifyEmail = require("../controller/CheckEmail");
var verifyPassword = require("../controller/CheckPassword");

router.post("/register", userController.registerUser);
router.get("/getUser", userController.getUser);
router.post("/login", userController.Login);
router.post("/verifyEmail", verifyEmail.checkEmail);
router.post("/verifyPassword", verifyPassword.checkPassword);

module.exports = router;
