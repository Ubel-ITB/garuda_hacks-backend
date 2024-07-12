const PostsController = require("../controllers/PostsController");
const authMiddleware = require("../middlewares/Authentication");
const PostsRouter = require("express").Router();

PostsRouter.get("/", PostsController.getAllPosts);
PostsRouter.post("/", authMiddleware, PostsController.post);

module.exports = PostsRouter;
