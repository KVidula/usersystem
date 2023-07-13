const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const { MONGODB_URL } = require('./config');

mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected',()=>{
    console.log("DB Connected!");
})

mongoose.connection.on('error',(error)=>{
    console.log('Some error while connecting to DB!');
})

app.use(cors());
app.use(express.json());

require("./models/user_model");

app.use(require("./routes/user_route"));

app.listen(PORT,()=>{
    console.log('Server Started!');
});