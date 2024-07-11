const AuthRouter = require("./AuthRouter");
const UploadsRouter = require("./UploadsRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use("/uploads", UploadsRouter);
router.use("/auth", AuthRouter);

module.exports = router;
