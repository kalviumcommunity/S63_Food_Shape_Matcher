const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    created_by: { type: String, required: true }, // Add created_by property
    
}, { timestamps: true });

module.exports = mongoose.model('Entity', entitySchema);
