const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: [String],
    photos: [String],
}, { timestamps: true });

const PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
