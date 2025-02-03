// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Container maxWidth="sm">
    <Typography variant="h4" component="h1" gutterBottom>
      Tableau de bord
    </Typography>
    <TextField
      label="Titre de la tâche"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      fullWidth
      margin="normal"
    />
      <TextField
      label="Description de la tâche"
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={addTask}>
      Ajouter
    </Button>
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.title} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Container>
);
};
export default Dashboard;
