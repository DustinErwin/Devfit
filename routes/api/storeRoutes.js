const router = require("express").Router();
const db = require("../../models");

// STORE APIs

// GET API that gets the list of all products
router.route("/productList").get((req, res) => {
  db.Product.find({})
  .then((products) => res.json(products))
  .catch((err) => res.status(500).json(err));
});

router.route("/order").post((req, res) => {
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

module.exports = router;
