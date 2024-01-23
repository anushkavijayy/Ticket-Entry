const express = require('express');
const { supportAgent, fetchAgents } = require('../controller/supportAgent');
const { supportTicket, showTickets } = require('../controller/supportTicket');

const router = express.Router();

router.use("/agent", supportAgent);
router.use("/ticket", supportTicket);
router.use("/show-tickets", showTickets); 
router.use("/fetch-agents", fetchAgents); 

module.exports = router;


