//Dependencies
const router = require("express").Router();
const employeeRoutes = require("./employeeRoutes");
const managerRoutes = require("./managerRoutes");
const memberRoutes = require("./memberRoutes");
const storeRoutes = require("./storeRoutes");
const registerAndLoginRoutes = require("./registerAndLoginRoutes");
const classRoutes = require("./classRoutes");
const db = require("../../models");

// API routes
router.use("/user", registerAndLoginRoutes);
router.use("/member", memberRoutes);
router.use("/employee", employeeRoutes);
router.use("/manager", managerRoutes);
router.use("/class", classRoutes);
router.use("/store", storeRoutes);

module.exports = router;
  

 
