const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VRTourSchema = new Schema({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    vrTourUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const VRTourModel = mongoose.model('VRTour', VRTourSchema);

module.exports = VRTourModel;
