const e = require("express");
const mongoose = require("mongoose");
const db = require("../models");
const ObjectId = mongoose.Types.ObjectId;
//const md5 = require("md5");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gymManagementSystem",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

member1_id = ObjectId();
member2_id = ObjectId();
member3_id = ObjectId();
member4_id = ObjectId();

employee1_id = ObjectId();
employee2_id = ObjectId();
employee3_id = ObjectId();
employee4_id = ObjectId();

product1_id = ObjectId();
product2_id = ObjectId();
product3_id = ObjectId();
product4_id = ObjectId();
product5_id = ObjectId();
product6_id = ObjectId();

const memberSeed = [
  {
    _id: member1_id,
    email: "Sarah@fitpro.com",
    first_name: "Sarah",
    last_name: "Pilot",
    date_of_birth: "1990-03-12",
    gender: "F",
    phone: "1111111111",
    role: "member",
  },
  {
    _id: member2_id,
    email: "Dwreck@over9000.com",
    first_name: "Dustin",
    last_name: "FireFly",
    date_of_birth: "2000-07-01",
    gender: "M",
    phone: "2222222222",
    role: "member",
  },
  {
    _id: member3_id,
    email: "JbigInt@yahoo.com",
    first_name: "Jesal",
    last_name: "Starboard",
    date_of_birth: "1989-02-20",
    gender: "F",
    phone: "3333333333",
    role: "member",
  },
  {
    _id: member4_id,
    email: "eSwiss@gmail.com",
    first_name: "Ethan",
    last_name: "Array",
    date_of_birth: "1992-03-4",
    gender: "M",
    phone: "4444444444",
    role: "member",
  },
];

const employeeSeed = [
  {
    _id: employee1_id,
    email: "jimdhima@yahoo.com",
    first_name: "Jim",
    last_name: "Dhima",
    gender: "M",
    phone: "1234567891",
    role: "manager",
  },
  {
    _id: employee2_id,
    email: "arav@gmail.com",
    first_name: "Aarav",
    last_name: "Patel",
    gender: "M",
    phone: "9744823958",
    role: "employee",
  },
  {
    _id: employee3_id,
    email: "FW@yahoo.com",
    first_name: "Felicia",
    last_name: "Wager",
    gender: "F",
    phone: "3537298253",
    role: "employee",
  },
  {
    _id: employee4_id,
    email: "abeer@yahoo.com",
    first_name: "Abeer",
    last_name: "Muwat",
    gender: "M",
    role: "employee",
    phone: "5839583255",
  },
];

const classSeed = [
  {
    class_name: "Zumba",
    day: "Thursday",
    start_time: "09:00:00",
    current_size: 0,
    max_size: 12,
    trainer_id: employee2_id,
    roster: [member1_id, member3_id],
  },
  {
    class_name: "Spin",
    day: "Tuesday",
    start_time: "14:00:00",
    current_size: 2,
    max_size: 10,
    trainer_id: employee4_id,
    roster: [member1_id, member3_id],
  },
  {
    class_name: "Barbell Blast",
    day: "Monday",
    start_time: "17:00:00",
    current_size: 1,
    max_size: 14,
    trainer_id: employee4_id,
    roster: [member2_id],
  },
];

const ProductSeed = [
  {
    _id: product1_id,
    name: "Jump Rope",
    description: "Tangle Free Jump Rope With Ball Bearings",
    price: 20,
    quantity: 100,
    image_path: "jumpRope.jpg",
  },
  {
    _id: product2_id,
    name: "25 lb Dumbbells",
    description:
      "Set of 2 dumbbells for resistance training; each dumbbell weighs 25 pounds. High quality solid cast dumbbell encased in rubber",
    price: 140,
    quantity: 60,
    image_path: "25lbDumbbells.jpg",
  },
  {
    _id: product3_id,
    name: "Gray Water Bottle",
    description: "Gray Mizu Water Bottle - 27 oz - Screw cap",
    price: 18,
    quantity: 200,
    image_path: "grayWaterBottle.jpg",
  },
  {
    _id: product4_id,
    name: "Medicine Ball",
    description: "Gray and purple medicine ball - 4 lbs",
    price: 50,
    quantity: 20,
    image_path: "medicineBall.jpg",
  },
  {
    _id: product5_id,
    name: "Strength building Set For Beginners",
    description:
      'Set of 2 handweights - 5 lbs - and 1 resistance band - 44", 10lbs',
    price: 25,
    quantity: 50,
    image_path: "weightsResistance.jpg",
  },
  {
    _id: product6_id,
    name: "Yoga Starter Set - Pink",
    description:
      "Yoga Mat with strap (strap not shown), yoga block, microfiber towel, set of 2 handweights - 2KG",
    price: 40,
    quantity: 30,
    image_path: "yogaSet.jpg",
  },
];

const OrderDetailsSeed1 = [
  {
    product_id: product1_id,
    name: "Jump Rope",
    price: 10,
    quantity: 2,
  },
  {
    product_id: product2_id,
    name: "25 lb Dumbbells",
    price: 30,
    quantity: 4,
  },
];

const OrderDetailsSeed2 = [
  {
    product_id: product1_id,
    name: "Jump Rope",
    price: 10,
    quantity: 3,
  },
  {
    product_id: product2_id,
    name: "25 lb Dumbbells",
    price: 30,
    quantity: 6,
  },
];
const OrderSeed = [
  {
    member_id: member1_id,
    purchased_items: OrderDetailsSeed1,
    order_date: new Date(),
    total_cost: 140,
    purchase_method: "credit_card",
  },
  {
    member_id: member3_id,
    purchased_items: OrderDetailsSeed2,
    order_date: new Date(),
    total_cost: 210,
    purchase_method: "debit_card",
  },
];

db.Member.remove({})
  .then(() => db.Member.collection.insertMany(memberSeed))
  .then((data) => {
    console.log(data.result.n + " member records inserted!");
  })
  .catch((err) => {
    console.error("member " + err);
  });

db.Employee.remove({})
  .then(() => db.Employee.collection.insertMany(employeeSeed))
  .then((data) => {
    console.log(data.result.n + " employee records inserted!");
  })
  .catch((err) => {
    console.error("employee " + err);
  });

db.Class.remove({})
  .then(() => db.Class.collection.insertMany(classSeed))
  .then((data) => {
    console.log(data.result.n + " class records inserted!");
  })
  .catch((err) => {
    console.error("Class " + err);
  });

db.Product.remove({})
  .then(() => db.Product.collection.insertMany(ProductSeed))
  .then((data) => {
    console.log(data.result.n + " product records inserted!");
  })
  .catch((err) => {
    console.error("product " + err);
  });

db.Order.remove({})
  .then(() => db.Order.collection.insertMany(OrderSeed))
  .then((data) => {
    console.log(data.result.n + " order records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("order " + err);
    process.exit(1);
  });
