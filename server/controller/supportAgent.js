const Agent = require('../models/Agent');

const fetchAgents = async (req,res) => {
    try {
        const agents = await Agent.find({});
        res.status(200).json(agents);
    }
    catch (err) {
        console.log('fetch agents error' , err);
        res.status(500).json({error : 'Internal Server Error'});
    }
}
const supportAgent = async (req,res) => {
    try{
        const newAgent = new Agent({name : req.body.name, 
            email: req.body.email, 
            phone : req.body.phone,
            description: req.body.description, 
            date: req.body.date, active: req.body.active });
        const savedAgent =  await newAgent.save();
        res.json(savedAgent);
    }
    catch(err) {
        res.status(500).json({err: err.message});
    }
}

module.exports = {supportAgent , fetchAgents} ;