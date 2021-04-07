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
};
