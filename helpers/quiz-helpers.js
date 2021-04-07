const { ObjectId } = require("mongodb");
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
  get: (date) => {
    return new Promise(async (resolve, reject) => {
      try {
        let quizzes = await db
          .get()
          .collection(QUIZ)
          .find({
            created_at: {
              $gt: date
                ? new Date(new Date(date).setHours(0, 0, 0, 0))
                : new Date(new Date().setHours(0, 0, 0, 0)),
            },
          })
          .toArray();
        resolve(quizzes);
      } catch (error) {
        reject(error);
      }
    });
  },
  update: (id, quiz) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(QUIZ)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $set: {
                question: quiz.question,
                answerOptions: quiz.answerOptions,
              },
            }
          )
          .then(async (response) => {
            let updated = await db
              .get()
              .collection(QUIZ)
              .findOne({ _id: ObjectId(id) });
            resolve(updated);
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  },
};
