const Property = require("../Models/Property");
const errorLogger = require("../logger/errorLogger");
const successLogger = require("../logger/successLogger");
const warnLogger = require("../logger/warnLogger");

// Get all property listings
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find(req.query); // Filters from query params
    successLogger.http("properties retrieved successfully");
    res.status(200).json(properties);
  } catch (error) {
    errorLogger.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Get property details
exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      warnLogger.warn("Property is not in the DB");
      return res.status(404).json({ error: "Property not found" });
    }
    successLogger.http("property retrieved successfully");
    res.status(200).json(property);
  } catch (error) {
    errorLogger.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new property listing
exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    successLogger.http("property created successfully");
    res.status(201).json(property);
  } catch (error) {
    errorLogger.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a property listing
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) {
      warnLogger.warn("Property is not in the DB");
      return res.status(404).json({ error: "Property not found" });
    }
    successLogger.http("property updated successfully");
    res.status(200).json(property);
  } catch (error) {
    errorLogger.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a property listing
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      warnLogger.warn("Property is not found");
      return res.status(404).json({ error: "Property not found" });
    }
    successLogger.http("property deleted successfully");
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    errorLogger.error("Internal error", error);
    res.status(500).json({ error: error.message });
  }
};
