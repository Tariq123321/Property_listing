const express = require('express');
const adminRouter = express.Router();
const { getAllUsers, getUserById, updateUserProfile, deleteUserById } = require('../Controllers/userController');
const {getAllProperties, getPropertyDetails, createProperty, updateProperty, deleteProperty} = require('../Controllers/propertyController');
const roleAuth = require('../middlewares/roleAuth');

// user endpoints
adminRouter.get('/users', roleAuth(['admin']), getAllUsers);
adminRouter.get('/users/:id', roleAuth(['admin']), getUserById);
adminRouter.put('/users/:id', roleAuth(['admin']), updateUserProfile);
adminRouter.delete('/users/:id', roleAuth(['admin']), deleteUserById);

// property endpoints
adminRouter.get('/properties', roleAuth(['admin']) , getAllProperties);
adminRouter.get('/properties/:id', roleAuth(['admin']), getPropertyDetails);
adminRouter.post('/properties', roleAuth(['admin']), createProperty);
adminRouter.put('/properties/:id', roleAuth(['admin']), updateProperty);
adminRouter.delete('/properties/:id', roleAuth(['admin']),  deleteProperty);

module.exports = adminRouter;






