const db = require("../config/connection"),
  { USER } = require("../config/collection");

module.exports = {
  get: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let users = db.get().collection(USER).find({}).toArray();
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  },
  create: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        let isUser = await db
          .get()
          .collection(USER)
          .findOne({ name: user.name });
        if (!isUser) {
          db.get()
            .collection(USER)
            .insertOne(user)
            .then((response) => {
              resolve(response.ops[0]);
            })
            .catch((err) => {
              reject(500);
            });
        } else {
          reject(403);
        }
      } catch (error) {
        reject(500);
      }
    });
  },
};
