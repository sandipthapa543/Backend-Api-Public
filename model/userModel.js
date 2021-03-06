const mongoose = require('mongoose');

const { Schema } = mongoose;


//* User schema in mongoose

const userSchema = new Schema({

    //* Attribute of user schema in mongodb


    first_Name: {
        type: String,
        required: true,

    },

    last_Name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'seller', 'sysadmin'],
    },

});


//* creating table in mongodb with take name 'User'.
const User = mongoose.model('User', userSchema);
module.exports = User;
