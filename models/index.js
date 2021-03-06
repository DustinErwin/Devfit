const mongoose = require("mongoose");
module.exports = {
    Member: require("./client"),
    Employee: require("./employee"),
    Class: require("./class"),
    ObjectId: mongoose.Types.ObjectId
};
  