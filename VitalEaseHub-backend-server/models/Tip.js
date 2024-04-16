//Create a model for Tips
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3, // Minimum length of 3 characters for the title
        maxlength: 100 // Maximum length of 100 characters for the title
    },
    description: {
        type: String,
        required: true,
        minlength: 10 // Minimum length of 10 characters for the description
    },
});

module.exports = mongoose.model('Tip', TipSchema);
