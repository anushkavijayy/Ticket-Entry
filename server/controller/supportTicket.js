const Ticket = require('../models/Ticket');


const supportTicket = async (req,res) => {
    try{
        const newTicket = new Ticket({description : req.body.description, topic: req.body.topic, resolvedOn: req.body.resolvedOn, dateCreated: req.body.dateCreated, status: req.body.status, assignedTo: req.body.assignedTo, type: req.body.type, Severity: req.body.Severity});
        const savedTicket=  await newAgent.save();
        res.json(savedTicket);
    }
    catch(err) {
        res.status(500).json({err: err.message});
    }
}


const showTickets = async (req,res) => {
    try{
        const allTickets = await Ticket.find();
        res.json(allTickets);
    }
    catch(err){
        res.status(500).json({err: err.message});
    }
}
module.exports = {supportTicket, showTickets};