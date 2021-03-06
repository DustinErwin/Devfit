const mongoose = require("mongoose");
module.exports = {
    Member: require("./client"),
    Employee: require("./employee"),
    Class: require("./class"),
    Product: require("./product"),
    ObjectId: mongoose.Types.ObjectId
};
  