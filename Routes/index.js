const express = require("express");
const userRouter = require("./userRouter");
const propertyRouter = require("./propertyRoutes");
const bookingRoutes = require("./bookingRoutes");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/properties", propertyRouter);
mainRouter.use("/bookings", bookingRoutes);

module.exports = mainRouter;
