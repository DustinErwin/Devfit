const router = require("express").Router();
const db = require("../../models");
const removeClassMember = require("../../utilities/removeClassMember");
const addToClass = require("../../utilities/addToClass");
const memberMap = require("../../utilities/memberMap");

// MANAGER PAGE APIs

// API to insert the new employee registration record in the employee table in the database
router.route("/addEmployee").post((req, res) => {
  const newEmployee = new db.Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
  });
  newEmployee
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).json(err));
});

// API that allows a manager to view all trainers
router.route("/trainers").get((req, res) => {
  db.Employee.find({ role: "employee" })
  .then((trainers) => res.json(trainers))
  .catch((err) => res.status(500).json(err));
});

// DELETE API that allows a manager to delete a trainer
router.route("/deleteTrainer/:id").delete((req, res) => {
  db.Employee.remove({ _id: req.params.id })
  .then(() => res.send("Success!"))
  .catch((err) => res.status(500).json(err));
});

// POST API that allows a manager to add a member/client to a class
router.route("/addToClass").post((req, res) => {
  db.Class.findOne({ _id: req.body.id })
  .then((selectedClass) => {
    const classUpdate = addToClass(selectedClass, req.body.memberid);
    db.Class.updateOne({ _id: req.body.id }, { $set: classUpdate })
      .then(() => res.send("Success!"))
      .catch((err) => res.status(500).json(err));
  })
  .catch((err) => res.status(500).json(err));
});

// POST API that allows a manager to remove a member/client from a class
router.route("/removeFromClass").post((req, res) => {
  db.Class.findOne({ _id: req.body.id })
  .then((selectedClass) => {
    const classUpdate = removeClassMember(selectedClass, req.body.memberid);
    db.Class.updateOne({ _id: req.body.id }, { $set: classUpdate })
      .then(() => res.send("Success!"))
      .catch((err) => res.status(500).json(err));
  })
  .catch((err) => res.status(500).json(err));
});

// GET API that gets list of all member names and ids
router.route("/memberList").get((req, res) => {
  db.Member.find({})
  .then((members) => res.json(memberMap(members)))
  .catch((err) => res.status(500).json(err));
});

// GET API to retrieve order history
router.route("/orderhistory").get((req, res) => {
  db.Order.find({})
  .then((orders) => res.send(orders))
  .catch((err) => res.status(401).json(err));
});

module.exports = router;
