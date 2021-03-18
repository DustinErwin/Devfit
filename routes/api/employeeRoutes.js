const router = require("express").Router();
const db = require("../../models");
const trainerSchedule = require("../../utilities/trainerSchedule");
const getEmployeeClassBundle = require("../../utilities/employeeClassBundle");

// API for adding a class
router.route("/addClass").post((req, res) => {
  db.Class.findOne({
    trainer_id: req.body.trainer_id,
    day: req.body.day,
    start_time: req.body.start_time,
  })
    .then((foundRecord) => {
      if (foundRecord) {
        res
          .status(500)
          .json({ err: "There is already an existing class at this time" });
      } else {
        const newClass = {
          class_name: req.body.class_name,
          day: req.body.day,
          start_time: req.body.start_time,
          current_size: 0,
          max_size: req.body.max_size,
          trainer_id: db.ObjectId(req.body.trainer_id),
          roster: [],
        };
        db.Class.create(newClass)
          .then((dbClass) => res.send(dbClass))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
});

//API to remove class
router.route("/removeClass/:id").delete((req, res) => {
  db.Class.remove({ _id: req.params.id })
    .then(() => res.send("Success!"))
    .catch((err) => res.status(500).json(err));
});

//API to get trainer schedule
router.route("/:id/schedule").get((req, res) => {
  db.Class.find({ trainer_id: req.params.id })
    .then((classes) => {
      db.Employee.findOne({ _id: req.params.id })
        .then((trainer) => res.send(trainerSchedule(trainer, classes)))
        .catch((err) => res.status(401).json(err));
    })
    .catch((err) => res.status(401).json(err));
});

// GET object to populate divs with class info
router.route("/:id/classes").get((req, res) => {
  db.Class.find({})
    .sort({ start_time: 1 })
    .then((classes) => {
      db.Employee.findOne({ _id: req.params.id })
        .then((currentUser) => {
          db.Employee.find({})
            .then((trainers) => {
              res.send(getEmployeeClassBundle(classes, currentUser, trainers));
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

module.exports = router;
