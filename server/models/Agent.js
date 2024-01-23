const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const agent = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // trim: true,
        // lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const Agent = mongoose.model('Agent', agent);
module.exports = Agent;
// module.exports = User = mongoose.model('User', userSchema);