'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = Schema({
    city: String,
    temp: Number,
    lastDateTime: { 
        type: Date,
        required: true 
    }
});

module.exports = mongoose.model('Weather', weatherSchema);