const UploadsRouter = require("express").Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Create storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folderName } = req.params;
    const dir = path.join(__dirname, "../public/uploads", folderName);

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const MulterUpload = multer({ storage });

UploadsRouter.get("/:folderName/:fileName", (req, res) => {
  const { folderName, fileName } = req.params;
  const filePath = path.join(__dirname, "../public/uploads", folderName, fileName);
  res.sendFile(filePath);
});

UploadsRouter.post("/:folderName/:fileName", MulterUpload.single("file"), (req, res) => {
  const { folderName } = req.params;
  console.log(folderName);
  const uploadedFilePath = `/uploads/${folderName}/${req?.file?.filename}`;
  res.status(201).json({ url: process.env.BASE_URL + uploadedFilePath });
});

module.exports = UploadsRouter;
