const express = require('express');
const userRouter = require('./userRouter');
const propertyRouter = require('./propertyRoutes');
const mainRouter = express.Router();


mainRouter.use("/user",userRouter);
mainRouter.use("/properties", propertyRouter);



module.exports = mainRouter


