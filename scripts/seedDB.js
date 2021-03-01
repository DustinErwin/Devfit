const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gymManagementSystem"
);

const memberSeed = [
  {
    email: "Sarah@fitpro.com",
    password: "member1",
    first_name: "Sarah",
    last_name: "Pilot",
    date_of_birth: "1990-03-12",
    gender: "F",
    phone: "1111111111",
    is_logged_in: 0,
 },
 {
    email: "Dwreck@over9000.com",
    password: "member2",
    first_name: "Dustin",
    last_name: "FireFly",
    date_of_birth: "2000-07-01",
    gender: "M",
    phone: "2222222222",
    is_logged_in: 0,
 },
 {
    email: "JbigInt@yahoo.com",
    password: "member3",
    first_name: "Jesal",
    last_name: "Starboard",
    date_of_birth: "1989-02-20",
    gender: "F",
    phone: "3333333333",
    is_logged_in: 0,
 },
 {
    email: "eSwiss@gmail.com",
    password: "Amember4",
    first_name: "Ethan",
    last_name: "Array",
    date_of_birth: "1992-03-4",
    gender: "M",
    phone: "4444444444",
    is_logged_in: 0,
 }
]

db.Member
    .remove({})
    .then(() => db.Member.collection.insertMany(memberSeed))
    .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });