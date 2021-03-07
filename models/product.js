const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Product Name is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    price:{
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity available is required']
    },
    image_path:{
        type: String,
        required: [true, 'Product image is required']
    }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;