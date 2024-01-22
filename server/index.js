const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
// const config = require('config');
var cors = require('cors');
const ticket = require('./Routes/ticket');

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());

const corsOptions = {
	origin: 'http://localhost:3000',
};
  
app.use(cors(corsOptions));

app.use("/api", ticket);

mongoose.connect("mongodb+srv://anushka:8905631069@cluster0.vozobxn.mongodb.net/", {
    useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
}).catch((err) => {
	// console.log(`${err}: did not connect`)
})

module.exports = app;