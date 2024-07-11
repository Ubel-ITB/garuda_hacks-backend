const CategoriesController = require("../controllers/CategoriesController");

const CategoriesRouter = require("express").Router();

CategoriesRouter.get("/", CategoriesController.getAll);
CategoriesRouter.post("/", CategoriesController.createCategory);
CategoriesRouter.delete("/:_id", CategoriesController.deleteReport);
CategoriesRouter.put("/:_id", CategoriesController.updateReport);

module.exports = CategoriesRouter;
