// models/entity.js
const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

// Create a model from the schema
const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;