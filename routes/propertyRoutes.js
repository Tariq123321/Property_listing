const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const roleAuth = require('../middlewares/roleAuth');

// public routes
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyDetails);

// Protected routes
router.post('/properties', roleAuth(['admin', 'owner']), propertyController.createProperty);
router.put('/properties/:id', roleAuth(['admin', 'owner']), propertyController.updateProperty);
router.delete('/properties/:id', roleAuth(['admin', 'owner']),  propertyController.deleteProperty);

module.exports = router;
