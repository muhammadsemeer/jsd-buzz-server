const router = require("express").Router(),
  authHelper = require("../helpers/auth-helper"),
  token = require("../utils/token");

router.post("/login", (req, res) => {
  authHelper
    .logIn(req.body)
    .then((admin) => {
      let adminToken = token.create(admin);
      res.cookie("adminToken", adminToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 864000000),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
      res.json(admin);
    })
    .catch(({ code, message }) => {
      res.status(code).json(message);
    });
});

module.exports = router;
