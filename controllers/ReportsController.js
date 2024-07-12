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

  static async getMyReports(req, res, next) {
    try {
      const ReportUserId = res.locals.user._id;
      const Data = await Report.findAll({ ReportUserId });
      res.status(200).json(Data);
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req, res, next) {
    try {
      const ReportUserId = res.locals.user._id;
      const { CategoryId, lat, lng, imgUrl, address, text, totalshares, status, progress, UpvotedUserIds, DownVotedUserIds } =
        req.body;

      const result = await Report.create({
        ReportUserId,
        CategoryId,
        lat,
        lng,
        imgUrl,
        address,
        text,
        totalshares,
        status,
        progress,
        UpvotedUserIds,
        DownVotedUserIds,
      });
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
      const { CategoryId, lat, lng, imgUrl, address, text, totalshares, status, progress, UpvotedUserIds, DownVotedUserIds } =
        req.body;

      const result = await Report.updateById(_id, {
        $set: {
          CategoryId,
          lat,
          lng,
          imgUrl,
          address,
          text,
          totalshares,
          status,
          progress,
          UpvotedUserIds,
          DownVotedUserIds,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportsController;
