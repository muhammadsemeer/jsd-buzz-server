const router = require("express").Router(),
  userHelpers = require("../helpers/user-helper");

router.get("/", (req, res) => {
  userHelpers
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
