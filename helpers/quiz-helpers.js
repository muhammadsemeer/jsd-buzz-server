const { ObjectId } = require("mongodb");
const db = require("../config/connection"),
  { QUIZ } = require("../config/collection");

module.exports = {
  create: (quiz) => {
    return new Promise((resolve, reject) => {
      try {
        quiz.created_at = new Date();
        quiz.isActive = true;
        quiz.answers = [];
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
            $and: [
              {
                created_at: {
                  $gt: date
                    ? new Date(new Date(date).setHours(12, 0, 0, 0))
                    : new Date(new Date().setHours(12, 0, 0, 0)),
                  $lt: date
                    ? new Date(
                        new Date(
                          new Date(date).setDate(new Date(date).getDate() + 1)
                        ).setHours(0)
                      )
                    : new Date(
                        new Date(
                          new Date().setDate(new Date().getDate() + 1)
                        ).setHours(0)
                      ),
                },
              },
              {
                isActive: true,
              },
            ],
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
  delete: (id) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(QUIZ)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $set: {
                isActive: false,
              },
            }
          )
          .then((response) => {
            resolve();
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  },
  addAnswer: (id, answer) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(QUIZ)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $push: { answers: answer },
            }
          )
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  isAnswered: (date, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        let answered = await db
          .get()
          .collection(QUIZ)
          .find({
            $and: [
              {
                created_at: {
                  $gt: date
                    ? new Date(new Date(date).setHours(0, 0, 0, 0))
                    : new Date(new Date().setHours(0, 0, 0, 0)),
                },
              },
              {
                answers: { $elemMatch: { answered_by: user } },
              },
            ],
          })
          .project({
            _id: 0,
            answers: 1,
          })
          .toArray();
        if (answered.length !== 0) {
          resolve(answered[0].answers[0]);
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};
