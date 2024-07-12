const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/MongoConnect");

class Post {
  constructor({ _id, AuthorId, CategoryId, authorName, authorProfilePictureUrl, title, content, imgUrl }) {
    Object.assign(this, { _id, AuthorId, CategoryId, authorName, authorProfilePictureUrl, title, content, imgUrl });
  }

  static async collection() {
    return getDatabase().collection("Posts");
  }

  static async findAll(query) {
    const collection = await Post.collection();
    const data = await collection.find(query).toArray();
    return data.map((el) => new Post(el));
  }

  static async findOne(query) {
    const collection = await Post.collection();
    const myData = await collection.findOne(query);
    return myData;
  }

  static async create({ AuthorId, CategoryId, authorName, authorProfilePictureUrl, title, content, imgUrl }) {
    const collection = await Post.collection();
    const result = await collection.insertOne({
      AuthorId,
      CategoryId,
      authorName,
      authorProfilePictureUrl,
      title,
      content,
      imgUrl,
    });
    return result;
  }

  static async deleteById(_id) {
    const collection = await Post.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    return result;
  }

  static async updateById(_id, updateDoc) {
    const collection = await Post.collection();
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, updateDoc);
    return result;
  }
}

module.exports = Post;
