const mongoose = require("mongoose");
const db = require("../models");


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
    is_logged_in: 0
 },
 {
    email: "Dwreck@over9000.com",
    password: "member2",
    first_name: "Dustin",
    last_name: "FireFly",
    date_of_birth: "2000-07-01",
    gender: "M",
    phone: "2222222222",
    is_logged_in: 0
 },
 {
    email: "JbigInt@yahoo.com",
    password: "member3",
    first_name: "Jesal",
    last_name: "Starboard",
    date_of_birth: "1989-02-20",
    gender: "F",
    phone: "3333333333",
    is_logged_in: 0
 },
 {
    email: "eSwiss@gmail.com",
    password: "member4",
    first_name: "Ethan",
    last_name: "Array",
    date_of_birth: "1992-03-4",
    gender: "M",
    phone: "4444444444",
    is_logged_in: 0
 }
]


const employeeSeed = [
    {
      email: "jimdhima@yahoo.com",
      password: "manager1",
      first_name: "Jim",
      last_name: "Dhima",
      gender: "M",
      phone: "1234567891",
      role: "Manager",
      is_logged_in: 0
   },
   {
      email: "arav@gmail.com",
      password: "trainer1",
      first_name: "Aarav",
      last_name: "Patel",
      gender: "M",
      phone: "9744823958",
      role: "Trainer",
      is_logged_in: 0
   },
   {
      email: "FW@yahoo.com",
      password: "trainer2",
      first_name: "Felicia",
      last_name: "Wager",
      gender: "F",
      phone: "3537298253",
      role: "Trainer",
      is_logged_in: 0
   },
   {
      email: "abeer@yahoo.com",
      password: "trainer3",
      first_name: "Abeer",
      last_name: "Muwat",
      gender: "M",
      role: "Trainer",
      phone: "5839583255",
      is_logged_in: 0
   }
  ]

db.Member
    .remove({})
    .then(() => db.Member.collection.insertMany(memberSeed))
    .then(data => {
      console.log(data.result.n + " member records inserted!");
    })
    .catch(err => {
      console.error("member " + err);
    });

db.Employee
    .remove({})
    .then(() => db.Employee.collection.insertMany(employeeSeed))
    .then(data => {
        console.log(data.result.n + " employee records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error("employee " + err);
        process.exit(1);
    });