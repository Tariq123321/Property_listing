const express = require("express");
const authRouter = require("./authRouter");
const propertyRouter = require("./propertyRoutes");
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/properties", propertyRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/admin", adminRouter);

module.exports = mainRouter;
