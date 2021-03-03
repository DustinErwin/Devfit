const db = require("../models");
const getClassBundle = require("../utilities/classBundle");
const addToClass = require("../utilities/addToClass");
const getEmployeeClassBundle = require("../utilities/employeeClassBundle");
const buildRoster = require("../utilities/buildRoster");

module.exports = (app) => {
  // GET object to populate divs with class info
  app.get("/api/member/:id/classes/", function (req, res) {
    db.Class.find({})
      .sort({ start_time: 1 })
      .then((classes) => {
        db.Member.findOne({ _id: req.params.id })
          .then((currentUser) => {
            db.Employee.find({})
              .then((trainers) => {
                res.json(getClassBundle(classes, currentUser, trainers));
              })
              .catch((err) => res.json(err));
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  //API to add member into chosen class -- Requires body with class id as id and member id as memberid
  app.post("/api/member/addToClass", (req, res) => {
    db.Class.findOne({ _id: req.body.id }).then((selectedClass) => {
      const classUpdate = addToClass(selectedClass, req.body.memberid);
      db.Class.updateOne({ _id: req.body.id }, { $set: classUpdate })
        .then(() => res.send("Success!"))
        .catch((err) => res.json(err));
    });
  });

  // GET object to populate divs with class info
  app.get("/api/employee/:id/classes", function (req, res) {
    db.Class.find({})
      .sort({ start_time: 1 })
      .then((classes) => {
        db.Employee.findOne({ _id: req.params.id })
          .then((currentUser) => {
            db.Employee.find({})
              .then((trainers) => {
                res.json(
                  getEmployeeClassBundle(classes, currentUser, trainers)
                );
              })
              .catch((err) => res.json(err));
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  // Query to insert the new employee registration record in the employee table in the database

  //Not tested--Wondering how this will work with auth0
  app.post("/api/manager/addEmployee", (req, res) => {
    db.Employee.insert({
      userName: req.body.userName,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone ? parseInt(req.body.phone) : null,
      role: req.body.role.toLowerCase(),
    })
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });

  // API to get class roster
  app.get("/api/class/:id/roster", (req, res) => {
    db.Class.findOne({ _id: req.params.id })
      .then((selectedClass) => {
        db.Member.find({}).then((members) =>
          res.json(buildRoster(members, selectedClass))
        );
      })
      .catch((err) => res.json(err));
  });

  // API for adding a class
  app.post("/api/employee/addClass", (req, res) => {
    const newClass = {
      class_name: req.body.class_name,
      day: req.body.day,
      start_time: req.body.start_time,
      current_size: req.body.current_size,
      max_size: req.body.max_size,
      trainer_id: req.body.trainer_id,
      roster: req.body.roster,
    };

    db.Class.create(newClass)
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });
};
