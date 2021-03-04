const db = require("../models");
const getClassBundle = require("../utilities/classBundle");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = (app) => {
  // GET object to populate divs with class info
  app.get("/api/classes/:id", function (req, res) {
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
};
