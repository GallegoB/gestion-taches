const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Validation des entrées
  if (!username || !password) {
    return res.status(400).send('Nom d\'utilisateur et mot de passe sont requis');
  }

  const hashedPassword = bcrypt.hashSync(password, 10); // Utilisation de 10 tours pour plus de sécurité
  console.log('Hashed Password:', hashedPassword); // Log du mot de passe haché

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Nom d\'utilisateur déjà pris');
      }
      return res.status(500).send('Erreur lors de l\'enregistrement');
    }
    res.status(201).send('Utilisateur enregistré avec succès');
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validation des entrées
  if (!username || !password) {
    return res.status(400).send('Nom d\'utilisateur et mot de passe sont requis');
  }

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la connexion');
    }
    if (results.length === 0) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    const user = results[0];
    console.log('Stored Hashed Password:', user.password); // Log du mot de passe haché stocké
    console.log('Provided Password:', password); // Log du mot de passe fourni

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log('Password Valid:', isPasswordValid); // Log du résultat de la comparaison

    if (!isPasswordValid) {
      return res.status(401).send('Mot de passe incorrect');
    }
    const token = jwt.sign({ id: user.id }, 'votre-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};
