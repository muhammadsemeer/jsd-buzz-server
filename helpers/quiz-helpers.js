const db = require("../config/connection"),
  { QUIZ } = require("../config/collection");

module.exports = {
  create: (quiz) => {
    return new Promise((resolve, reject) => {
      try {
        quiz.created_at = new Date();
        db.get()
          .collection(QUIZ)
          .insertOne(quiz)
          .then((response) => {
            resolve(response.ops[0]);
          })
          .catch((err) => {
            reject();
          });
      } catch (err) {
        reject();
      }
    });
  },
};
