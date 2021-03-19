const router = require("express").Router();
const db = require("../../models");
const capitalize = require("../../utilities/capitalize");
//LOGIN PAGE API

// GET current user info
router.route("/:email").get((req, res) => {
  db.Member.findOne({ email: req.params.email })
  .then((currentUser) => {
    if (currentUser) {
      res.json(currentUser);
    } else {
      db.Employee.findOne({ email: req.params.email })
        .then((currentUser) => {
          res.json(currentUser);
        })
        .catch((err) => res.json(err));
    }
  })
  .catch((err) => res.json(err));
});

// REGISTER PAGE API

// POST API and query to insert the new member registration record in the member table in the database
router.route("/register").post((req, res) => {
  const newMember = new db.Member({
    email: req.body.email,
    password: req.body.password,
    first_name: capitalize(req.body.first_name),
    last_name: capitalize(req.body.last_name),
    date_of_birth: req.body.date_of_birth
      ? new Date(req.body.date_of_birth)
      : null,
    gender: req.body.gender,
    phone: req.body.phone,
    role: req.body.role,
  }); // sends the member details as response
  newMember
    .save()
    .then((dbMember) => res.send(dbMember))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;