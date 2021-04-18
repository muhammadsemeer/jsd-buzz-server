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
        let a1 = sortedUsers.findIndex((value) => value.name === "Soorya Kriz");
        let a2 = sortedUsers.findIndex(
          (value) => value.name === "Muhammad Semeer"
        );
        sortedUsers.splice(a1, 1);
        sortedUsers.splice(a2, 1);
        resolve(sortedUsers);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};
