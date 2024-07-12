require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { MongoConnect } = require("./config/MongoConnect");
const router = require("./routes");
const { errorHandler } = require("./middlewares/Errorhandler");
const User = require("./models/User");
const { getHashedString } = require("./helpers/bcrypt");
const Category = require("./models/Category");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json("NOT FOUND");
});

(async () => {
  try {
    await MongoConnect();

    const existingAdmin = await User.findOne({ username: "superadmin" });
    if (!existingAdmin) {
      await User.create({ username: "superadmin", password: getHashedString("123"), role: "admin" });
    }
    const existingOfficer = await User.findOne({ username: "officer" });
    if (!existingOfficer) {
      await User.create({ username: "officer", password: getHashedString("123"), role: "officer" });
    }
    const existingPublisher = await User.findOne({ username: "publisher" });
    if (!existingPublisher) {
      await User.create({ username: "publisher", password: getHashedString("123"), role: "publisher" });
    }
    const existingReportCategory = await Category.findOne({ name: "others" });
    if (!existingReportCategory) {
      await Category.create({ name: "others" });
    }

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start app");
    console.error(error);
  }
})();
