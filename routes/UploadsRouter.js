const UploadsRouter = require("express").Router();
const path = require("path");
const MulterUpload = require("../middlewares/MulterUpload");

UploadsRouter.get("/:folderName/:fileName", (req, res) => {
  const { folderName, fileName } = req.params;
  const filePath = path.join(__dirname, "../public/uploads", folderName, fileName);
  res.sendFile(filePath);
});

UploadsRouter.post("/:folderName/:fileName", MulterUpload.single("file"), (req, res) => {
  const { folderName } = req.params;
<<<<<<< HEAD
  const uploadedFilePath = `/uploads/${folderName}/${req?.file?.filename}`;
=======
  const uploadedFilePath = `/uploads/${folderName}/${req.file.filename}`;
>>>>>>> 1d86e710fabe8563ec1f30b27dd946eb2c8583b3
  res.status(201).json({ url: process.env.BASE_URL + uploadedFilePath });
});

module.exports = UploadsRouter;
