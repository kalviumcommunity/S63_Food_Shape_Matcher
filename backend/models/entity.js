const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    created_by: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Entity', entitySchema);
