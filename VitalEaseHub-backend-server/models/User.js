// Load bcrypt module, used to hash the passwords
const bcrypt = require('bcrypt')

//Create model for User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function(value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    province: {
        type: String,
        required: [true, 'Province is required']
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value);
            },
            message: props => `${props.value} is not a valid postal code`
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(value) {
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['patient', 'nurse'],
        default: 'patient'
    }
});


// hash the passwords before saving
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('User', UserSchema);
