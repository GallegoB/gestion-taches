// src/components/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Tableau de bord</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Nouvelle tâche"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            {task}
            <button onClick={() => removeTask(index)} className="bg-red-500 text-white p-1 rounded">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
