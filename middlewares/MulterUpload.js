const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { folderName } = req.params;
    const uploadPath = path.join(__dirname, `../public/uploads/folderName/`);

    // Check if the folder exists, and if not, create it
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, uploadPath);
      }

      // Check if .gitignore file exists, and if not, create it
      const gitignorePath = path.join(uploadPath, ".gitignore");
      if (!fs.existsSync(gitignorePath)) {
        fs.writeFileSync(gitignorePath, "*\n!.gitignore");
      }

      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const { fileName } = req.params;
    const fileExtension = path.extname(file.originalname); // Extract the file extension
    cb(null, fileName + "-" + Date.now() + uuidv4() + fileExtension); // Append the file extension
  },
});

// Config multer
const MulterUpload = multer({
  storage: storage,
});

module.exports = MulterUpload;
