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
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res.status(400).send('Le titre et la description sont requis');
  }

  const sql = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
  console.log(userId);
  console.log(title);
  console.log(description);
  db.query(sql, [title, description, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la création de la tâche');
    }
    res.status(201).send('Tâche créée avec succès');
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
