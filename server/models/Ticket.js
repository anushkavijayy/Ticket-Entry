const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const ticket = new Schema({
    topic: {
        type: String
    },
    description: {
        type: String
    },
    resolvedOn: {
        type: Date
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['New', 'Assigned', 'Resolved'], 
        default: 'New', 
    },
    assignedTo: {
        type: String
    },
    type: {
        type: String
    },
    Severity: {
        type: String
    }
});

const Ticket = mongoose.model('Ticket', ticket);
module.exports = Ticket;