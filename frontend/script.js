const API_URL = 'http://localhost:5000/tasks';

// FETCH AND LOG ALL TASKS FROM POSTGRESQL
async function getTasks() {
  try {
    const response = await fetch(API_URL); // Sends a GET request to your Express backend
    const tasks = await response.json();   // Converts raw data to a readable JS array
    
    console.log("🎉 Live data fetched from DB:", tasks);
    
  } catch (error) {
    console.error("❌ Failed to pull tasks from backend:", error);
  }
}

// Run this function immediately when the webpage opens
getTasks();
// SEND A NEW TASK TO THE DATABASE
async function addTask(taskTitle) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: taskTitle }), // Sends the input value as JSON
    });

    const newTask = await response.json();
    console.log("🚀 Task successfully saved to database:", newTask);
    
    // Clear the input box and refresh the console log
    document.getElementById('task-input').value = '';
    getTasks(); 
    
  } catch (error) {
    console.error("❌ Error adding task:", error);
  }
}

// LISTEN FOR FORM SUBMISSIONS
document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents the webpage from reloading automatically
  const taskInput = document.getElementById('task-input');
  
  if (taskInput.value.trim() !== '') {
    addTask(taskInput.value); // Fire off our network post request
  }
});