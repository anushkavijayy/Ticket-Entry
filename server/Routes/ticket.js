const express = require('express');
const { supportAgent } = require('../controller/supportAgent');
const { supportTicket, showTickets } = require('../controller/supportTicket');

const router = express.Router();

router.use("/agent", supportAgent);
router.use("/ticket", supportTicket);
router.use("/show-tickets", showTickets); // url m apital nhi aata

module.exports = router;


