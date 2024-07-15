require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyRoutes');
const connectMongoDB = require('./config/db');

const app = express();

app.use(express.json());

// Connect to MongoDB
connectMongoDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', propertyRoutes);

module.exports = app;
