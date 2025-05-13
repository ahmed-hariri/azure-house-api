const express = require("express");
const { signInController, signUpController } = require("../../controllers/auth");

/*---> Define authentication routes <---*/
const authRoutes = express.Router();

authRoutes.post("/register", signUpController);
authRoutes.post("/login", signInController);

module.exports = authRoutes;
