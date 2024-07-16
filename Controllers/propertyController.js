const Property = require('../models/Property');

// Get all property listings
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find(req.query); // Filters from query params
    console.log("properties retrieved successfully");
    res.status(200).json(properties);
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Get property details
exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      console.warn('Property is not in the DB');
      return res.status(404).json({ error: 'Property not found' });
    }
    console.log("property updated successfully");
    res.status(200).json(property);
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new property listing
exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    console.log("property created successfully");
    res.status(201).json(property);
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a property listing
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      console.warn('Property is not in the DB');
      return res.status(404).json({ error: 'Property not found' });
    }
    console.log("property updated successfully");
    res.status(200).json(property);
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a property listing
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      console.warn('Property is not in the DB');
      return res.status(404).json({ error: 'Property not found' });
    }
    console.log("property deleted successfully");
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};
