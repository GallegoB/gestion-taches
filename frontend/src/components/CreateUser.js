import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
  } from '@mui/material';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('Compte créé avec succès !');
      // Rediriger vers la page de login après la création du compte
      const response2 = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response2.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Erreur lors de la création du compte');
    }
  };

  return (

   <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Création d'un compte
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Créer un compte
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUser;