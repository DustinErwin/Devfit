const db = require("../models");
const getClassBundle = require("../utilities/classBundle");
const addToClass = require("../utilities/addToClass");
const getEmployeeClassBundle = require("../utilities/employeeClassBundle");
const buildRoster = require("../utilities/buildRoster");
const trainerSchedule = require("../utilities/trainerSchedule");
const memberMap = require("../utilities/memberMap");
const removeClassMember = require("../utilities/removeClassMember");

module.exports = (app) => {
  //LOGIN PAGE API

  // POST "api/login" authenticates the member login credentials in the database, and responds with the member id
  app.post("/api/login", (req, res) => {
    // Find if there is a matching member
    db.Member.findOne({
      email: req.body.username,
      password: req.body.password,
    }).then((userMember) => {
      if (!userMember) {
        // No matching member found. Lets see if we have a matching Employee instead.
        db.Employee.findOne({
          email: req.body.username,
          password: req.body.password,
        }).then((employee) => {
          if (!employee) {
            res.status(401).json({ error: "Invalid login. Please try again" });
          } else {
            employee.is_logged_in = true;
            employee.save().then((updatedEmployee) => {
              res.json({
                id: updatedEmployee._id,
                userName: updatedEmployee.first_name,
                role: updatedEmployee.role,
              });
            });
          }
        });
      } else {
        console.log("Found Member ", userMember);
        userMember.is_logged_in = true;
        userMember.save().then((updatedMember) => {
          res.json({ id: updatedMember._id });
        });
      }
    });
  });

  // REGISTER PAGE API

  // POST API and query to insert the new member registration record in the member table in the database
  // Need to work on the date of birth
  app.post("/api/register", (req, res) => {
    const newMember = new db.Member({
      email: req.body.userName,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth ? req.body.date_of_birth : null,
      gender: req.body.gender,
      phone: req.body.phone,
    }); // sends the member details as response
    newMember
      .save()
      .then((dbMember) => res.send(dbMember))
      .catch((err) => res.status(500).json(err));
  });

  // MEMBER PAGE APIs

  // GET current user info
  app.get("/api/user/:email", function (req, res) {
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

  // GET object to populate divs with class info
  app.get("/api/member/:id/classes", function (req, res) {
    db.Class.find({})
      .sort({ start_time: 1 })
      .then((classes) => {
        db.Member.findOne({ _id: req.params.id })
          .then((currentUser) => {
            db.Employee.find({})
              .then((trainers) => {
                res.json(getClassBundle(classes, currentUser, trainers));
              }).then
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
      current_size: 0,
      max_size: req.body.max_size,
      trainer_id: db.ObjectId(req.body.trainer_id),
      roster: [],
    };

    db.Class.create(newClass)
      .then((clazz) => res.send(clazz))
      .catch((err) => res.status(500).json(err));
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

  // GET Api to retrieve order history
  app.get("/api/manager/orderhistory", (req, res) => {
    db.Order.find({})
      .then((orders) => res.send(orders))
      .catch((err) => res.status(401).json(err));
  });

  // MANAGER PAGE APIs
  // API to insert the new employee registration record in the employee table in the database
  // Wondering how this will work with auth0
  app.post("/api/manager/addEmployee", (req, res) => {
    const newEmployee = new db.Employee({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
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
  app.get("/api/manager/trainers", (req, res) => {
    db.Employee.find({ role: "employee" })
      .then((trainers) => res.json(trainers))
      .catch((err) => res.status(500).json(err));
  });

  // DELETE API that allows a manager to delete a trainer
  app.delete("/api/manager/deleteTrainer/:id", (req, res) => {
    db.Employee.remove({ _id: req.params.id })
      .then(() => res.send("Success!"))
      .catch((err) => res.status(500).json(err));
  });

  // POST API that allows a manager to add a member/client to a class
  app.post("/api/manager/addToClass", (req, res) => {
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
  app.post("/api/manager/removeFromClass", (req, res) => {
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
  app.get("/api/manager/memberList", (req, res) => {
    db.Member.find({})
      .then((members) => res.json(memberMap(members)))
      .catch((err) => res.status(500).json(err));
  });

  // STORE APIs
  // GET API that gets the list of all products
  app.get("/api/store/productList", (req, res) => {
    db.Product.find({})
      .then((products) => res.json(products))
      .catch((err) => res.status(500).json(err));
  });

  // POST API that saves the order to the database
  app.post("/api/store/order", (req, res) => {
    // Following object expected from front-end
    // {
    //   member_id:"",
    //   order_details:[{
    //     product_id:"",
    //     price:,
    //     quantity:
    //   },{
    //     product_id:"",
    //     price:,
    //     quantity:
    //   }],
    //   purchase_method:""
    // }

    let totalCost = 0;
    const orderDetails = req.body.order_details;
    orderDetails.forEach((orderItem) => {
      const currentTotal = orderItem.price * orderItem.quantity;
      totalCost += currentTotal;
    });
    const order = new db.Order({
      member_id: db.ObjectId(req.body.member_id),
      purchased_items: orderDetails,
      order_date: Date.now(),
      total_cost: totalCost,
      purchase_method: req.body.purchase_method,
    });
    order
      .save()
      .then((savedOrder) => res.json(savedOrder))
      .catch((err) => res.status(500).json(err));
  });
};
