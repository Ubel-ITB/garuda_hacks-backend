const ReportsController = require("../controllers/ReportsController");

const ReportsRouter = require("express").Router();

ReportsRouter.get("/", ReportsController.getAll);
ReportsRouter.get("/mine", ReportsController.getOneByID);
ReportsRouter.post("/", ReportsController.createReport);
ReportsRouter.delete("/:_id", ReportsController.deleteReport);
ReportsRouter.put("/:_id", ReportsController.updateReport);

module.exports = ReportsRouter;
