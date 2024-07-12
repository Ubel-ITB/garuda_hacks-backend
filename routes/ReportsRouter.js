const ReportsController = require("../controllers/ReportsController");
const Authentication = require("../middlewares/Authentication");

const ReportsRouter = require("express").Router();

ReportsRouter.get("/", ReportsController.getAll);
ReportsRouter.get("/mine", ReportsController.getMyReports);
ReportsRouter.post("/", Authentication, ReportsController.createReport);
ReportsRouter.delete("/:_id", Authentication, ReportsController.deleteReport);
ReportsRouter.put("/:_id", Authentication, ReportsController.updateReport);

module.exports = ReportsRouter;
