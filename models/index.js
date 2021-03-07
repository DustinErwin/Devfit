const mongoose = require("mongoose");
module.exports = {
    Member: require("./client"),
    Employee: require("./employee"),
    Class: require("./class"),
    Product: require("./product"),
    Order: require("./order"),
    ObjectId: mongoose.Types.ObjectId
};
  