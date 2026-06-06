const { Pool } = require('pg');

// 1. Configure the connection details
const pool = new Pool({
  user: 'postgres',              // Your PostgreSQL master username
  host: 'localhost',             // The database is running locally on your machine
  database: 'productivity_app',   // The database you created on Day 5
  password: 'Prersan1234', // ⚠️ Replace this with your actual pgAdmin password!
  port: 5432,                    // The default PostgreSQL port
});

// 2. Test the connection immediately when the app starts
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error connecting to the database:', err.stack);
  }
  console.log('🎉 Successfully connected to the PostgreSQL database!');
  release(); 
});

// 3. Export the pool so server.js can use it
module.exports = pool;