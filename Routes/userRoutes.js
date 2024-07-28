const express = require('express');
const userRouter = express.Router();
const { getUserProfile, updateUserProfile } = require('../Controllers/userController');
const roleAuth = require('../middlewares/roleAuth');

// User routes
userRouter.get('/profile', roleAuth(['admin', 'user', 'owner']), getUserProfile);
userRouter.put('/profile', roleAuth(['admin', 'user' ,'owner']), updateUserProfile);

module.exports = userRouter;
