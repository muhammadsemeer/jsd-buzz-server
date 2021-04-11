const db = require("../config/connection"),
  { ADMIN } = require("../config/collection"),
  bcrypt = require("bcrypt");

module.exports = {
  logIn: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let admin = await db.get().collection(ADMIN).findOne({ email });
        if (admin) {
          bcrypt.compare(password, admin.password, (err, same) => {
            if (err) reject({ code: 500 });
            if (same) {
              delete admin.password;
              resolve(admin);
            } else {
              console.log("here1");
              reject({ code: 403, message: "Invalid Email or Password" });
            }
          });
        } else {
          console.log("here2");
          reject({ code: 403, message: "Invalid Email or Password" });
        }
      } catch (error) {
        console.log(error);
        reject({ code: 500 });
      }
    });
  },
};
