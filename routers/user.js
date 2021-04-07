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

router.post("/", (req, res) => {
  userHelpers
    .create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((code) => {
      res.sendStatus(code);
    });
});

module.exports = router;
