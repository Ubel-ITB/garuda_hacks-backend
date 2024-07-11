require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { MongoConnect } = require("./config/MongoConnect");
const router = require("./routes");
const { errorHandler } = require("./middlewares/ErrorHandler");

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
    app.listen(port, () => {
      console.log(`Example app listening on port port`);
    });
  } catch (error) {
    console.error("Failed to start app");
    console.error(error);
  }
})();
