const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    
    type: {
        type: String,
        required: true,
        min:1,
        max: 255
    },
    company: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    coco: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    site: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    person: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    department: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    cause: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    carrier: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    referBy: {
        type: String,
        required: true,
        min:1,
        max:255
    },
    amount: {
        type: Number,
        required: true,
    },
    otherCost: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    dena: {
        type: Number,
        required: true,
    },
    paona: {
        type: Number,
        required: true,
    },
    vara: {
        type: Number,
        required: true,
    },
    warning: {
        type: String,
        min:1,
        max:1024
    },
    note: {
        type: String,
        min:1,
        max:1024
    },
    editedBy: {
        type: String,
        required: true,
        min:1,
        max:1024
    },
    file_url: {
        type: String,
        min:1,
        max:1024
    },
    date: {
        type: Date,
        default: Date.now 
    }

});

module.exports = mongoose.model('Entry', entrySchema);