const { ObjectId } = require("mongodb");
const { getPayload } = require("../helpers/jwt");
const User = require("../models/User");
const { CustomError } = require("./ErrorHandler");
const { JsonWebTokenError } = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.access_token;
    if (!accessToken) throw new CustomError(403, "Please re-login");

    const payload = getPayload(accessToken);
    if (!payload) throw new CustomError(403, "Please re-login");

    const { _id, username, password } = payload;
    if (!_id || !username || !password) throw new CustomError(403, "Please re-login");

    const existingUser = await User.findOne({ _id: new ObjectId(_id), username });

    if (!existingUser || password !== existingUser.password) {
      throw new CustomError(403, "Please re-login");
    }

    res.locals.user = { _id, username };
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      error = new CustomError(403, "Please re-login");
    }
    next(error);
  }
};

module.exports = Authentication;
