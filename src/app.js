const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Curriq API Node.js application!'
    });
});

app.listen(3000, () => {
    if (!fs.existsSync('./database.sqlite')) {
        const db = require('./database'); 
    } 
    
    console.log('Server is running on port 3000');
});

module.exports = app;