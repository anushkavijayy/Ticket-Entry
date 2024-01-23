const Ticket = require('../models/Ticket');
const Agent = require('../models/Agent')


const supportTicket = async (req, res) => {
    try {
        const newTicket = new Ticket({
            description: req.body.description,
            topic: req.body.topic,
            resolvedOn: req.body.resolvedOn,
            dateCreated: req.body.dateCreated,
            status: req.body.status,
            type: req.body.type,
            Severity: req.body.Severity,
        });

        // Fetch all active agents
        const activeAgents = await Agent.find({ active: true });
        const numberOfAgents = activeAgents.length;

        if (numberOfAgents === 0) {
            return res.status(400).json({ err: 'No active agents available' });
        }

        let assignedAgent;

        // Check if any tickets have been assigned yet
        const ticketCount = await Ticket.countDocuments();

        if (ticketCount > 0) {
            // Calculate the index of the next agent using round-robin logic
            const lastAssignedAgentIndex = ticketCount % numberOfAgents; //RR
            assignedAgent = activeAgents[lastAssignedAgentIndex];
        } else {
            // If no tickets have been assigned yet, assign the ticket to the first available agent
            assignedAgent = activeAgents[0];
        }

        if (!assignedAgent) {
            return res.status(400).json({ err: 'No agent found for assignment' });
        }

        // Assign the ticket to the calculated agent
        newTicket.assignedTo = assignedAgent._id;

        // Save the ticket
        const savedTicket = await newTicket.save();

        res.json(savedTicket);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}


const showTickets = async (req, res) => {
    try {
        const allTickets = await Ticket.find();
        res.json(allTickets);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
}
module.exports = { supportTicket, showTickets };