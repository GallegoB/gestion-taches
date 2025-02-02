// backend/controllers/taskController.js
const db = require('../db');

exports.getTasks = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération des tâches');
    }
    res.status(200).json(results);
  });
};

exports.createTask = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;
  const sql = 'INSERT INTO tasks (title, user_id) VALUES (?, ?)';
  db.query(sql, [title, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de l\'ajout de la tâche');
    }
    const newTask = { id: result.insertId, title, userId };
    res.status(201).json(newTask);
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la suppression de la tâche');
    }
    res.status(200).send('Tâche supprimée avec succès');
  });
};
