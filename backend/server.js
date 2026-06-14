// 1. Import core packages
const express = require("express"); 
const cors = require('cors');

// 2. Import your new router map
const taskRoutes = require('./routes/taskRoutes'); 

const app = express(); 

// 3. Global Middleware configuration
app.use(cors());        
app.use(express.json()); // Allows Express to read incoming JSON packages

// 4. Route Mounting (The secret sauce)
app.use('/tasks', taskRoutes); 

// 5. Start the Server engine
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Clean architectural server running on port ${PORT}`);
});