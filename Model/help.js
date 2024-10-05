const mongoose = require('mongoose');
const { schema } = require('./userSchema');

const helpSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 250,
        min: 20,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Help',helpSchema);