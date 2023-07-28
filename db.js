const sql = require('mssql');

// Database configuration
const config = {
    user: 'your_db_username',
    password: process.env.DB_PW,
    server: 'your_db_server',
    database: 'your_db_name',
    options: {
        encrypt: true, // If your SQL Server requires an encrypted connection, set this to true
    },
};

// Create a new pool for database connections
const pool = new sql.ConnectionPool(config);

// Function to connect to the database
async function connectToDB() {
    try {
        await pool.connect();
        console.log('Connected to the database!');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

module.exports = {
    sql,
    connectToDB,
};
