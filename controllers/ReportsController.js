const { ObjectId } = require("bson");
const Report = require("../models/Report");
const { getToken } = require("../helpers/jwt");
const { getHashedString, isStringRelevant } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/Errorhandler");

class ReportsController {
  static async getAll(req, res, next) {
    try {
      const Data = await Report.findAll();
      res.status(200).json(Data);
    } catch (error) {
      next(error);
    }
  }

  static async getOneByID(req, res, next) {
    try {
      //const ReportUserId = res.locals.user._id;
      const ReportUserId = "668fda3a5f8a11fcb80e5984";
      const Data = await Report.findAll({ ReportUserId: new ObjectId(ReportUserId) });
      res.status(200).json(Data);
    } catch (error) {
      next(error);
    }
  }

  static async getOneByCategory(req, res, next) {
    try {
      //const CategoryId = req.body;
      const CategoryId = "668fede56d0f34b07730503b";
      const Data = await Report.findAll({ CategoryId });
      res.status(200).json(Data);
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req, res, next) {
    try {
      //const reportUserId = res.locals.user._id;
      const ReportUserId = new ObjectId();
      const { CategoryId, lat, lng, imgUrl, address, text, totalshares } = req.body;

      const result = await Report.create({ ReportUserId, CategoryId, lat, lng, imgUrl, address, text, totalshares });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReport(req, res, next) {
    try {
      const { _id } = req.params;

      const result = await Report.deleteById(_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateReport(req, res, next) {
    try {
      const { _id } = req.params;

      const result = await Report.updateById(_id, {
        $set: {
          CategoryId: "668fede56d0f34b07730503b",
          lat: 50,
          lng: 50,
          imgUrl: "dopepic",
          address: "Jl. Skibidi",
          text: "Great Job!",
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ReportsController;
