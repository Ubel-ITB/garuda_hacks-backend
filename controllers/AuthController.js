const { ObjectId } = require("bson");
const User = require("../models/User");
const { getToken } = require("../helpers/jwt");
const { getHashedString, isStringRelevant } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/Errorhandler");

class AuthController {
  static async signIn(req, res, next) {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (!isStringRelevant(password, existingUser.password)) {
        throw new CustomError(403, "Wrong username or password");
      }

      res.status(200).json(getToken(existingUser));
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req, res, next) {
    try {
      const { username, password, displayName, role } = req.body;
      const { insertedId } = await User.create({ username, password: getHashedString(password), displayName, role });

      const existingUser = await User.findOne({ _id: new ObjectId(insertedId) });

      res.status(201).json(getToken(existingUser));
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AuthController;
