const express = require('express');
const PropertyRouter = express.Router();
const {getAllProperties, getPropertyDetails, createProperty, updateProperty, deleteProperty} = require('../Controllers/propertyController');
const roleAuth = require('../middlewares/roleAuth');

PropertyRouter.get('/', roleAuth(['user', 'owner']) , getAllProperties);
PropertyRouter.get('/:id', roleAuth(['user', 'owner']), getPropertyDetails);

PropertyRouter.post('/', roleAuth(['owner']), createProperty);
PropertyRouter.put('/:id', roleAuth(['owner']), updateProperty);
PropertyRouter.delete('/:id', roleAuth(['owner']),  deleteProperty);

module.exports = PropertyRouter;
