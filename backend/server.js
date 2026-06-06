const express = require("express"); 
const pool= require('./db');
const app = express(); 
// 1. MIDDLEWARE: This MUST run before your POST route tries to read req.body
app.use(express.json());

// 2. THE DATA ARRAY: This must be defined before the routes use it
let dynamicTasks= [
    { id : 1 , title : "Finish Day 3 of Upskilling" , completed : false },
    { id : 2 , title : "Review JavaScript Array Methods" , completed : true }
]; 

// 3. GET ROUTE
app.get("/api/tasks", (req, res) => { 
    res.json(dynamicTasks);
}); 

// 4. UPGRADED POST ROUTE 
app.post("/api/tasks", (req, res) => {
    const userTitle = req.body.title; 

    if (!userTitle) {
        return res.status(400).json({ error: "Task title is required!" });
    } 

    const newTask = { 
        id: dynamicTasks.length + 1, 
        title: userTitle, 
        completed: false 
    };

    dynamicTasks.push(newTask);
    res.status(201).json({ message: "Custom task created!", task: newTask });
});

// 5. SERVER START: Keep at the very bottom
const PORT = 5000;
app.listen(PORT, () => { 
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});