const router = require("express").Router(),
  scoreController = require("../controller/score");

router.post("/add", (req, res) => {
  scoreController
    .addScore(req.body)
    .then((score) => {
      res.json(score);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
