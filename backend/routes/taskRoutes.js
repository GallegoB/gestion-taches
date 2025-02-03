// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, (req, res) => {
    console.log('GET /tasks route hit');
    taskController.getTasks(req, res);
  });
router.post('/', authMiddleware, taskController.createTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
