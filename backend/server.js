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
// Dummy data array to simulate a database for now
let dynamicTasks = [
    { id: 1, title: "Finish Day 3 of Upskilling", completed: false },
    { id: 2, title: "Review JavaScript Array Methods", completed: true }
];

// 1. GET Route: Fetch all tasks
app.get("/api/tasks", (req, res) => {
    console.log("Frontend requested the task list!");
    res.json(dynamicTasks);
});

// 2. POST Route: Add a temporary placeholder task
app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: dynamicTasks.length + 1,
        title: "New Simulation Task",
        completed: false
    };
    dynamicTasks.push(newTask);
    res.json({ message: "Task added successfully!", task: newTask });
});

// 5. Tell the server to start listening for requests on Port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});