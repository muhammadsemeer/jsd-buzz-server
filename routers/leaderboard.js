const router = require("express").Router(),
  leaderboard = require("../helpers/leaderboard");

router.get("/", (req, res) => {
  let page = req.query.page || 0;
  let limit = req.query.limit || 5;
  leaderboard
    .getLeaderBoard()
    .then((resp) => {
      let pages = Math.floor(resp.length / limit);
      let start = page * limit;
      let paginated = resp.slice(start, start + limit);
      res.json({ board: paginated, pages });
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
