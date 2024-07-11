const PostsController = require("../controllers/PostsController");

const PostsRouter = require("express").Router();

PostsRouter.get("/", PostsController.getAllPosts);
PostsRouter.post("/", PostsController.post);

module.exports = PostsRouter;
