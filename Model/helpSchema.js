const mongoose = require('mongoose');
const { schema } = require('./userSchema');

const helpSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
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
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers for longitude and latitude
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Help', helpSchema);