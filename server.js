var express = require("express");
const db = require("./models");
const path = require("path");
// var compression = require("compression");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(path.join(__dirname, "./public")));

// app.use(compression({ filter: shouldCompress }));

// function shouldCompress(req, res) {
//   if (req.headers["x-no-compression"]) {
//     // don't compress responses with this request header
//     return false;
//   }

//   // fallback to standard filter function
//   return compression.filter(req, res);
// }
// Routes
// =============================================================
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Starting our Express app
// =============================================================

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
