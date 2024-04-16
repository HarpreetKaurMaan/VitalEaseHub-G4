const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    responderName: {
        type: String,
        required: [true, 'Responder name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function(value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(value) {
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    patientName: {
        type: String,
        required: [true, 'Patient name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

module.exports = mongoose.model('Alert', AlertSchema);
