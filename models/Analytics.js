const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
    userEngagement: { type: Number, required: true },
    numberOfListings: { type: Number, required: true },
    numberOfBookings: { type: Number, required: true },
    marketTrends: { type: String, required: true },
    predictiveAnalytics: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const AnalyticsModel = mongoose.model('Analytics', AnalyticsSchema);

module.exports = AnalyticsModel;
