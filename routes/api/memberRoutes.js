const router = require("express").Router();
const db = require("../../models");
const removeClassMember = require("../../utilities/removeClassMember");
const addToClass = require("../../utilities/addToClass");
const getJoinedClassBundle = require("../../utilities/joinedClassBundle");

// MEMBER PAGE APIs

// GET object to populate divs with class info
router.route("/:id/classes").get((req, res) => {
  db.Class.find({})
  .sort({ start_time: 1 })
  .then((classes) => {
    db.Member.findOne({ _id: req.params.id })
      .then((currentUser) => {
        res.json(getJoinedClassBundle(classes, currentUser));
      })
      .catch((err) => res.json(err));
  })
  .catch((err) => res.json(err));
});

// API to add member into chosen class
router.route("/addToClass").post((req, res) => {
  db.Class.findOne({ _id: req.body.id })
  .then((selectedClass) => {
    const classUpdate = addToClass(selectedClass, req.body.memberid);
    db.Class.updateOne({ _id: req.body.id }, { $set: classUpdate })
      .then((res) => res.status(200).json(res))
      .catch((err) => res.json(err));
  })
  .catch((err) => res.json(err));
});

// POST api to allow member to remove themselves from a selected class
router.route("/removeFromClass").post((req, res) => {
  db.Class.findOne({ _id: req.body.id })
  .then((selectedClass) => {
    const classUpdate = removeClassMember(selectedClass, req.body.memberid);
    db.Class.updateOne({ _id: req.body.id }, { $set: classUpdate })
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(500).json(err));
  })
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
