const { ObjectId } = require("mongodb");
const Post = require("../models/Post");
const PostCategory = require("../models/PostCategory");
const { capitalizeTitle, capitalizeFirstLetter } = require("../Helper/Casing");
const User = require("../models/User");

class PostsController {
  static async getAllPosts(req, res, next) {
    try {
      const data = await Post.findAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async post(req, res, next) {
    try {
      let { title, content, imgUrl, category } = req.body;
      title = capitalizeTitle(title);
      category = capitalizeFirstLetter(category);
      if (Array.isArray(category)) {
        category = category.map((tag) => capitalizeFirstLetter(tag));
      }
      const { _id } = res.locals.user;
      const AuthorId = new ObjectId(_id);
      const authorInfo = await User.findOne({ _id: AuthorId });
      const authorName = authorInfo.displayName;
      const authorProfilePictureUrl = "authorInfo.imgUrl";
      const existingCategory = await PostCategory.findOne({ name: category });

      let CategoryId;
      if (existingCategory) {
        CategoryId = existingCategory._id;
      } else {
        const newCategory = await PostCategory.create({ name: category });
        CategoryId = newCategory.insertedId;
      }

      const data = await Post.create({ AuthorId, CategoryId, authorName, authorProfilePictureUrl, title, content, imgUrl });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PostsController;
