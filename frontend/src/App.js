import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './components/CreateUser' ;
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
