const express = require("express");
const router = express.Router();
const UserController = require('../http/controller/UserController')
const Auth = require("../http/middleware/Auth");


router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);


module.exports = router;