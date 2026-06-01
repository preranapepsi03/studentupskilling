// 1. Import the Express package you just installed
const express = require("express"); 

// 2. Initialize the Express application
const app = express(); 

// 3. Create your first "Home" route (Endpoint)
app.get("/", (req, res) => {
    res.send("Hello World! Your backend server is officially working.");
});

// 4. Create a second route for "Users" (for your future signup/login data)
app.get("/users", (req, res) => {
    res.json({ message: "This is the users endpoint!" });
});

// 5. Tell the server to start listening for requests on Port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});