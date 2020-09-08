const Post = require('./postModel');
class DB {
  constructor() {
    this.Post = Post;
  }
  async post(filter, updater) {
    if (typeof updater === "object") {
      return await this.Post.findOneAndUpdate(filter, updater, { new: true });
    }
    if (typeof updater === "string") {
      if (updater === "") {
        return await this.Post.find(filter);
      } else {
        return await this.Post.find(filter, updater);
      }
    }
    if (typeof updater === "undefined") {
      const doc = new this.Post(filter);
      return await doc.save();
    }
  };
}

module.exports = DB;
