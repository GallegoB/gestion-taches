const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de l\'enregistrement');
    }
    res.status(201).send('Utilisateur enregistré avec succès');
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la connexion');
    }
    if (results.length === 0) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Mot de passe incorrect');
    }
    const token = jwt.sign({ id: user.id }, 'votre-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};
