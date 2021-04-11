const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  create: (data) => {
    let token = jwt.sign(data, process.env.JWT_SECERT, {
      expiresIn: "10d",
    });
    return token;
  },
};
