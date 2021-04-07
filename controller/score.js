const db = require("../config/connection"),
  { USER } = require("../config/collection"),
  { ObjectId } = require("mongodb");

module.exports = {
  addScore: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(USER)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $inc: { totalScore: 1 },
            }
          )
          .then(async () => {
            let user = await db
              .get()
              .collection(USER)
              .findOne({ _id: ObjectId(id) });
            resolve(user?.totalScore);
          })
          .catch((error) => {
            reject();
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  },
};
