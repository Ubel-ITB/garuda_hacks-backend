const AuthController = require("../controllers/AuthController");

const AuthRouter = require("express").Router();

AuthRouter.post("/sign-in", AuthController.signIn);
AuthRouter.post("/sign-up", AuthController.signUp);

module.exports = AuthRouter;
