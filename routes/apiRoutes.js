const db = require("../models");
const getClassBundle = require("../utilities/classBundle");

module.exports = (app) => {
  // GET object to populate divs with class info
  app.get("/api/classes/:id", function (req, res) {
    db.Class.find()
      .sort({ start_time: 1 })
      .then((classes) => {
        db.Member.findOne(
          { _id: mongojs.ObjectId(req.params.id) },
          (error, data) => {
            if (error) {
              res.send(error);
            } else {
              res.send(data);
            }
          }
        )
          .then((currentUser) => {
            db.Employee.find()
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
