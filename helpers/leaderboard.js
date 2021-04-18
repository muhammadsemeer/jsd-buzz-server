const db = require("../config/connection"),
  { QUIZ } = require("../config/collection");

module.exports = {
  getLeaderBoard: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let answers = await db
          .get()
          .collection(QUIZ)
          .find({})
          .project({
            _id: 0,
            answers: 1,
          })
          .toArray();
        let users = [];
        answers.forEach((element) => {
          element.answers.forEach((element) => {
            let isExist = users.findIndex(
              (value) => value.name === element.answered_by
            );
            if (isExist === -1) {
              users = [
                ...users,
                { name: element.answered_by, point: element.isCorrect ? 1 : 0 },
              ];
            } else {
              users[isExist].point += element.isCorrect ? 1 : 0;
            }
          });
        });
        let sortedUsers = users.sort((a, b) => {
          return b.point - a.point;
        });
        resolve(sortedUsers);
      } catch (error) {
        reject(error);
      }
    });
  },
};
