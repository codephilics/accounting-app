const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    
    type: {
        type: String,
        require: false,
        min:1,
        max: 255
    },
    company: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    coco: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    site: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    person: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    department: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    cause: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    carrier: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    referBy: {
        type: String,
        require: false,
        min:1,
        max:255
    },
    amount: {
        type: Number,
        require: false,
    },
    otherCost: {
        type: Number,
        require: false,
    },
    dena: {
        type: Number,
        require: false,
    },
    paona: {
        type: Number,
        require: false,
    },
    vara: {
        type: Number,
        require: false,
    },
    quantity: {
        type: Number,
        require: false,
    },
    warning: {
        type: Number,
        require: false,
    },
    note: {
        type: String,
        require: false,
        min:1,
        max:1024
    },
    editedBy: {
        type: String,
        require: false,
        min:1,
        max:1024
    },
    date: {
        type: String,
        require: false,
    },
    time:{
        type: String
    }


});

module.exports = mongoose.model('Entry', entrySchema);