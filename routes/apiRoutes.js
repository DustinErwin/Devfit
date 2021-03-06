const db = require("../models");
const getClassBundle = require("../utilities/classBundle");
const addToClass = require("../utilities/addToClass");
const getEmployeeClassBundle = require("../utilities/employeeClassBundle");
const buildRoster = require("../utilities/buildRoster");
const trainerSchedule = require("../utilities/trainerSchedule");

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

  // POST "api/login" authenticates the member login credentials in the database, and responds with the member id
  app.post("/api/login", (req, res) => {
  // Find if there is a matching member
    db.Member.findOne({ email: req.body.username, password: req.body.password})
    .then((userMember) => {
      if (!userMember) {
        // No matching member found. Lets see if we have a matching Employee instead.
        db.Employee.findOne({ email: req.body.username, password: req.body.password})
        .then((employee) => {
          if (!employee) {
            res.status(401).json({error: "Invalid login. Please try again" })
          } else {
            employee.is_logged_in = true;
            employee.save().then((updatedEmployee) => {
              res.json({
                id: updatedEmployee._id,
                userName: updatedEmployee.first_name,
                role: updatedEmployee.role,
              });
            })
          }
        });
      } else {
        console.log("Found Member ", userMember);
        userMember.is_logged_in = true;
        userMember.save().then((updatedMember) => {
          res.json({id: updatedMember._id});
        });
      }
    });
  })
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
  // NOTE: Currently Broken! Roster will usually start empty and is rejected by model verification
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

  //API to remove class from the database
  app.delete("/api/employee/removeClass/:id", (req, res) => {
    db.Class.remove({ _id: req.params.id })
      .then(() => res.send("Success!"))
      .catch((err) => res.status(500).json(err));
  });

  //API to get trainer schedule
  app.get("/api/employee/:id/schedule", (req, res) => {
    db.Class.find({ trainer_id: req.params.id })
      .then((classes) => {
        db.Employee.findOne({ _id: req.params.id })
          .then((trainer) => res.send(trainerSchedule(trainer, classes)))
          .catch((err) => res.status(401).json(err));
      })
      .catch((err) => res.status(401).json(err));
  });
};
