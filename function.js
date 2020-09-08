
const DB = require('./DB.js');
const db = new DB()
class Post {
  async create(first) {
    const res = await db.post(first); 
    return res;
  }

  async get(filter, matches) {
    const res = await db.post(filter, matches);
    if (res[0] !== undefined) {
      return res;
    } else {
      return false;
    }
  }
  async set(filter, updater) {
    const res = await db.post(filter, updater);
    return res;
  }
  async del(filter) {
      await db.Post.deleteOne(filter);
      return
  }
}
var post = new Post();

module.exports = {
  post: post,
};
