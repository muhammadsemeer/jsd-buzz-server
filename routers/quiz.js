const router = require("express").Router(),
  quizHelper = require("../helpers/quiz-helpers");

router.post("/", (req, res) => {
  if (
    req.body &&
    Object.keys(req.body).length === 0 &&
    req.body.constructor === Object
  ) {
    return res.sendStatus(400);
  }
  quizHelper
    .create(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  quizHelper
    .get(req.query ? req.query.date : null)
    .then((quizzes) => {
      res.json(quizzes);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
