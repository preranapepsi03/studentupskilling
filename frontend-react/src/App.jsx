import React from 'react';
import Router from 'preact-router';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Import our brand new pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';

export function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col antialiased">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        <Sidebar />
        
        <main className="flex-1 p-8 max-w-4xl">
          {/* Preact Router reads the URL path and displays the correct page instantly */}
          <Router>
            <Home path="/" />
            <Dashboard path="/dashboard" />
            <TasksPage path="/tasks" />
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;