const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/MongoConnect");

class PostCategory {
  constructor({ _id, name }) {
    Object.assign(this, { _id, name });
  }

  static async collection() {
    return getDatabase().collection("PostCategories");
  }

  static async findAll(query) {
    const collection = await PostCategory.collection();
    const data = await collection.find(query).toArray();
    return data.map((el) => new PostCategory(el));
  }

  static async findOne(query) {
    const collection = await PostCategory.collection();
    const myData = await collection.findOne(query);
    return myData;
  }

  static async create({ name }) {
    const collection = await PostCategory.collection();
    const result = await collection.insertOne({ name });
    return result;
  }

  static async deleteById(_id) {
    const collection = await PostCategory.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    return result;
  }

  static async updateById(_id, updateDoc) {
    const collection = await PostCategory.collection();
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, updateDoc);
    return result;
  }
}

module.exports = PostCategory;
