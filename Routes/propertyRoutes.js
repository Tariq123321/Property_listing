const express = require('express');
const PropertyRouter = express.Router();
const {getAllProperties, getPropertyDetails, createProperty, updateProperty, deleteProperty} = require('../Controllers/propertyController');
const roleAuth = require('../middlewares/roleAuth');

// public routes
PropertyRouter.get('/', getAllProperties);
PropertyRouter.get('/:id', getPropertyDetails);

// Protected routes
PropertyRouter.post('/', roleAuth(['admin', 'owner']), createProperty);
PropertyRouter.put('/:id', roleAuth(['admin', 'owner']), updateProperty);
PropertyRouter.delete('/:id', roleAuth(['admin', 'owner']),  deleteProperty);

module.exports = PropertyRouter;
