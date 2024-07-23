const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    bhk:{type:String, required: true},
    area: {type:String, required: true},
    price: { type: Number, required: true },
    amenities: [String],
    photos: [String],
    popular:{type: Boolean}
}, { timestamps: true });

const PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
