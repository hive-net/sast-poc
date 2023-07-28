const express = require('express');
const { connectToDB } = require('./db');
const {pool} = require("mssql/lib/global-connection");
const app = express();
const port = 3000;

// Connect to the database
connectToDB();

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Long method example
app.get('/long-method', (req, res) => {
    console.log('This is a long method with unnecessary repeated code. Long methods are considered code smells.');
    // Some code...
    // More code...
    // Even more code...
    // And so on...
});

app.get('/user', async (req, res) => {
    try {
        const result = await pool.request().query(`SELECT * FROM users WHERE id = '${req.query.userId}'`); // Vulnerable to SQL injection
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error retrieving data from the database');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
