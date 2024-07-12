const PostsController = require("../controllers/PostsController");
const authMiddleware = require("../middlewares/Authentication");
const PostsRouter = require("express").Router();

PostsRouter.get("/", PostsController.getAllPosts);
PostsRouter.get("/categories", PostsController.getAllPostCategories);
PostsRouter.post("/", authMiddleware, PostsController.post);
PostsRouter.get("/categories/:CategoryId", PostsController.getAllPostsByCategoryId);
PostsRouter.get("/:postId", PostsController.getById);

module.exports = PostsRouter;
