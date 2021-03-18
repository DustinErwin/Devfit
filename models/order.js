const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity available is required"],
  },
});

const OrderSchema = new Schema({
  member_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  purchased_items: [OrderDetailsSchema],
  order_date: {
    type: Date,
    required: [true, "Order date is required"],
  },
  total_cost: {
    type: Number,
    required: [true, "Total cost is required"],
  },
  purchase_method: {
    type: String,
    required: [true, "Purchase method is required"],
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
