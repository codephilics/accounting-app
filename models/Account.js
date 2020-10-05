const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        min:3,
        max:255
    },

    id: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    
    nid: {
        type: String,
        required: true,
        min:1,
        max:255
    },

    blood_group: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    
    father_name: {
        type: String,
        required: true,
        min:3,
        max:255
    },
    
    mother_name: {
        type: String,
        required: true,
        min:3,
        max:255
    },

    parmanent_address: {
        type: String,
        required: true,
        min:2,
        max:1024
    },

    present_address: {
        type: String,
        required: true,
        min:2,
        max:1024
    },

    opening_date: {
        type: String,
        min:6,
        max:255
    },

    closing_date: {
        type: String,
        min:6,
        max:255
    },

    note: {
        type: String,
        min:2,
        max:1024
    },

    created_by: {
        type: String,
        required: true,
        min:2,
        max:1024
    },
    date: {
        type: String
    }

});

module.exports = mongoose.model('Account', accountSchema);