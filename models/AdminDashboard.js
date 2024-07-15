const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminDashboardSchema = new Schema({
    totalUsers: { type: Number, required: true },
    totalProperties: { type: Number, required: true },
    totalBookings: { type: Number, required: true },
    analytics: { type: mongoose.Schema.Types.ObjectId, ref: 'Analytics', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const AdminDashboardModel = mongoose.model('AdminDashboard', AdminDashboardSchema);

module.exports = AdminDashboardModel;
