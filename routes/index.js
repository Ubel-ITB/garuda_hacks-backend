const AuthRouter = require("./AuthRouter");
const UploadsRouter = require("./UploadsRouter");
const ReportsRouter = require("./ReportsRouter");
const CategoriesRouter = require("./CategoriesRouter");
const PostsRouter = require("./PostsRouter");
const ProfileRouter = require("./ProfileRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/uploads", UploadsRouter);
router.use("/auth", AuthRouter);
router.use("/reports", ReportsRouter);
router.use("/categories", CategoriesRouter);
router.use("/posts", PostsRouter);
router.use("/profile", ProfileRouter);

module.exports = router;
