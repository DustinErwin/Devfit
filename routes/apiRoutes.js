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
};
