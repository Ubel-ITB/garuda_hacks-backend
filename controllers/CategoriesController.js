const { ObjectId } = require("bson");
const Category = require("../models/Category");
const { getToken } = require("../helpers/jwt");
const { getHashedString, isStringRelevant } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/Errorhandler");

class CategoriesController {
  static async getAll(req, res, next) {
    try {
      const Data = await Category.findAll();
      res.status(200).json(Data);
    } catch (error) {
      next(error);
    }
  }
  static async createCategory(req, res, next) {
    try {
      //const reportUserId = res.locals.user._id;
      const { name } = req.body;

      const result = await Category.create({ name });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReport(req, res, next) {
    try {
      const { _id } = req.params;

      const result = await Category.deleteById(_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateReport(req, res, next) {
    try {
      const { _id } = req.params;
      //const { name } = req.body;

      const result = await Category.updateById(_id, {
        $set: {
          name: "Road Damage",
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CategoriesController;
