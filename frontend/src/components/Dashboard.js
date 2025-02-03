// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log du token
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const newTask = {
        title: taskTitle, // Assurez-vous que taskTitle est défini
        description: taskDescription // Assurez-vous que taskDescription est défini
      };
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTaskTitle(''); // Réinitialiser le titre de la tâche
      setTaskDescription(''); // Réinitialiser la description de la tâche
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  const removeTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log du token
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Tableau de bord</h1>
      <div className="mb-4">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Titre de la tâche"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Description de la tâche"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex justify-between items-center">
            {task.title}
            <button onClick={() => removeTask(task.id)} className="bg-red-500 text-white p-1 rounded">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
