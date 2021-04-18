const router = require("express").Router(),
  leaderboard = require("../helpers/leaderboard");

router.get("/", (req, res) => {
  leaderboard
    .getLeaderBoard()
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
