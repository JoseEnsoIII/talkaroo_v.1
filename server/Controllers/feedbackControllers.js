const db = require('../config/db');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, feedbackType, message } = req.body;
    
    if (!name || !email || !feedbackType || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.query(
      'INSERT INTO feedback (name, email, feedback_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, feedbackType, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};