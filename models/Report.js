const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/MongoConnect");

class Report {
  constructor({ _id, ReportUserId, CategoryId, lat, lng, imgUrl, address, text }) {
    Object.assign(this, { _id, ReportUserId, CategoryId, lat, lng, imgUrl, address, text });
  }

  static async collection() {
    return getDatabase().collection("Reports");
  }

  static async findAll(query) {
    const collection = await Report.collection();
    const data = await collection.find(query).toArray();
    return data.map((el) => new Report(el));
  }

  static async findOne(query) {
    const collection = await Report.collection();
    const myData = await collection.findOne(query);
    return myData;
  }

  static async create({ ReportUserId, CategoryId, lat, lng, imgUrl, address, text }) {
    const collection = await Report.collection();
    const result = await collection.insertOne({ ReportUserId, CategoryId, lat, lng, imgUrl, address, text });
    return result;
  }

  static async deleteById(_id) {
    const collection = await Report.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    return result;
  }

  static async updateById(_id, updateDoc) {
    const collection = await Report.collection();
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, updateDoc);
    return result;
  }
}

module.exports = Report;
