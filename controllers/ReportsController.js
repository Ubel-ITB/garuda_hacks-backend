const { ObjectId } = require("bson");
const Report = require("../models/Report");
const { getToken } = require("../helpers/jwt");
const { getHashedString, isStringRelevant } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/Errorhandler");
const User = require("../models/User");

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

  static async updateProgress(req, res, next) {
    try {
      const { _id } = req.params;
      const OfficerId = res.locals.user._id;

      const existingUser = await User.findOne({ _id: new ObjectId(OfficerId) });
      if (!existingUser || (existingUser.role !== "officer" && existingUser.role !== "admin"))
        throw new CustomError(403, "Forbidden");

      const { text, imgUrl } = req.body;
      const status = "On Progress";

      const result = await Report.updateById(_id, {
        $set: {
          status,
          progress: {
            OfficerId,
            text,
            imgUrl,
          },
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProgressComplete(req, res, next) {
    try {
      const { _id } = req.params;
      const OfficerId = res.locals.user._id;

      const existingUser = await User.findOne({ _id: new ObjectId(OfficerId) });

      if (!existingUser || (existingUser.role !== "officer" && existingUser.role !== "admin")) {
        console.log(existingUser.role);
        throw new CustomError(403, "Forbidden1");
      }

      const existingReport = await Report.findOne({ _id: new ObjectId(_id) });
      if (!existingReport) {
        throw new CustomError(403, "Forbidden2");
      }

      const status = "Finished";

      const result = await Report.updateById(_id, {
        $set: {
          status,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateShareCount(req, res, next) {
    try {
      const { _id } = req.params;

      const existingReport = await Report.findOne({ _id: new ObjectId(_id) });
      if (!existingReport) {
        throw new CustomError(403, "Forbidden2");
      }

      const result = await Report.updateById(_id, { $inc: { totalshares: 1 } });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportsController;
