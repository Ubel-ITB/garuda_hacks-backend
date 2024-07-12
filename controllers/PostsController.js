const { ObjectId } = require("mongodb");
const Post = require("../models/Post");
const PostCategory = require("../models/PostCategory");
const { capitalizeTitle, capitalizeFirstLetter } = require("../Helper/Casing");
const User = require("../models/User");

class PostsController {
  static async getAllPosts(req, res, next) {
    try {
      const data = await Post.findAll();
      for (const post of data) {
        const author = await User.findOne({ _id: new ObjectId(post.AuthorId) });
        if (!author) continue;
        post.authorName = author.displayName;
        post.authorProfilePicUrl = author.profilePicUrl;
        const category = await PostCategory.findOne({ _id: new ObjectId(post.CategoryId) });
        if (!category) continue;
        post.categoryName = category.name;
      }

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await Post.findOne({ _id: new ObjectId(postId) });
      const author = await User.findOne({ _id: new ObjectId(post.AuthorId) });
      if (author) {
        post.authorName = author.displayName;
        post.authorProfilePicUrl = author.profilePicUrl;
      }
      const category = await PostCategory.findOne({ _id: new ObjectId(post.CategoryId) });
      if (category) {
        post.categoryName = category.name;
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostsByCategoryId(req, res, next) {
    try {
      const { CategoryId } = req.params;
      const data = await Post.findAll({ CategoryId: new ObjectId(CategoryId) });
      for (const post of data) {
        const author = await User.findOne({ _id: new ObjectId(post.AuthorId) });
        if (!author) continue;
        post.authorName = author.displayName;
        post.authorProfilePicUrl = author.profilePicUrl;
        const category = await PostCategory.findOne({ _id: new ObjectId(post.CategoryId) });
        if (!category) continue;
        post.categoryName = category.name;
      }

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostCategories(req, res, next) {
    try {
      const data = await PostCategory.findAll();
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
      const existingCategory = await PostCategory.findOne({ name: category });

      let CategoryId;
      if (existingCategory) {
        CategoryId = existingCategory._id;
      } else {
        const newCategory = await PostCategory.create({ name: category });
        CategoryId = newCategory.insertedId;
      }

      const data = await Post.create({ AuthorId, CategoryId, title, content, imgUrl });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PostsController;
