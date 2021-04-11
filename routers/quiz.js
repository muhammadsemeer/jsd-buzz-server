const router = require("express").Router(),
  quizHelper = require("../helpers/quiz-helpers"),
  { verifyAdmin } = require("../middlewares/admin.auth");

router.post("/", verifyAdmin, (req, res) => {
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

router.put("/:id", verifyAdmin, (req, res) => {
  quizHelper
    .update(req.params.id, req.body)
    .then((updated) => {
      res.json(updated);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.delete("/:id", verifyAdmin, (req, res) => {
  quizHelper
    .delete(req.params.id)
    .then((response) => res.sendStatus(200))
    .catch((err) => res.sendStatus(500));
});

router.patch("/answer/:id", (req, res) => {
  quizHelper
    .addAnswer(req.params.id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.post("/check-answered", (req, res) => {
  quizHelper
    .isAnswered(req.query.date, req.body.user)
    .then((answer) => {
      res.json(answer);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.get("/stats", async (req, res) => {
  quizHelper
    .getStats(await quizHelper.get(req.query.date))
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
