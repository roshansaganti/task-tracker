import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true
      },
      {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false
      }
    
    ]
  )

  // CRUD

  // Create Task (Add)
  const addTask = (task) => {
    // console.log('add', task)
    const id = Math.floor(Math.random() * 10000) + 1;

    const newTask = { id, ...task }
    setTasks([ ...tasks, newTask ])
  }

  // Update Task

  // Delete Task
  const deleteTask = (id) => {
    // console.log('delete', id);
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Route path="/" exact render={(props) => (
          <div>
            {showAddTask && <AddTask onAdd={addTask} />}
            {/* If task exists, then: */}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
              // Else, do this:
            ) : ('No Tasks')}
          </div>
        )}/>
        <Route path="/about" component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
