const db = require("../models");
const getClassBundle = require("../utilities/classBundle");
const addToClass = require("../utilities/addToClass");
const getEmployeeClassBundle = require("../utilities/employeeClassBundle");

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
};
