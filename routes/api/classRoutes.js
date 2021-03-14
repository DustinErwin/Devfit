const router = require("express").Router();
const db = require("../../models");
const buildRoster = require("../../utilities/buildRoster");
const getClassBundle = require("../../utilities/classBundle");

// API to get class roster
router.route("/:id/roster").get((req, res) => {
  db.Class.findOne({ _id: req.params.id })
  .then((selectedClass) => {
    db.Member.find({}).then((members) =>
      res.json(buildRoster(members, selectedClass))
    );
  })
  .catch((err) => res.json(err));
});

router.route("/classes").get((req, res) => {
  db.Class.find({})
    .sort({ start_time: 1 })
    .then((classes) => {
      db.Employee.find({})
        .then((trainers) => {
          res.json(getClassBundle(classes, trainers));
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

module.exports = router;