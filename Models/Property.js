const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the address sub-schema
const AddressSchema = new Schema({
  apartment: { type: String, required: true },
  area: { type: String, required: true },
  flatOrRoom_no: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  sector: { type: String, required: true },
  state: { type: String, required: true },
  street: { type: String, required: true },
  townCity: { type: String, required: true },
});

const mealSchema = new Schema({
  breakfast: { type: [String], default: [""] },
  lunch: { type: [String], default: [""] },
  evening: { type: [String], default: [""] },
  dinner: { type: [String], default: [""] },
});

const menuSchema = new Schema({
  day: { type: String, required: true },
  meals: mealSchema,
});

// Define the property schema
const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: AddressSchema, required: true }, // Use the address sub-schema
    type: { type: String, enum: ["Room/Flat", "PG"], required: true },
    accommodationType: {
      type: String,
      enum: ["Girls", "Boys", "Both"],
      required: true,
    },
    bhk: { type: Number, required: true },
    area: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: [String],
    images: [String],
    VRimages: [String],
    popular: { type: Boolean },
    occupancy: [String],
    services: [String],
    menu: [menuSchema],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
