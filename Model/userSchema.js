const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        // required: true,
        max: 50
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required:true
        },
        coordinates: {
            type: [Number],
            // required:true
        }
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        validate: {
            validator: function (value) {
                // Custom validator for exact case sensitivity
                return ['Male', 'Female', 'Other'].includes(value);
            },
            message: props => `${props.value} is not a valid gender. Please use 'Male', 'Female', or 'Other'.`
        },
    },
    occupation: {
        type: String,
        max: 50
    }
    // phone: {
    //     type: String,
    //     required: true,
    //     max: 10
    // },
    // password: {
    //     type: String,
    //     required: true,
    //     max: 20
    // }
},
    { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User