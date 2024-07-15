const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoommateMatchingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lifestylePreferences: { type: String, required: true },
    habits: { type: String, required: true },
    compatibilityScore: { type: Number, required: true }
});

const RoommateMatchingModel = mongoose.model('RoommateMatching', RoommateMatchingSchema);

module.exports = RoommateMatchingModel;
