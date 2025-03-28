const express = require('express');
const pool = require('../config/db'); // Import the DB pool from config/db.js

const router = express.Router();
// Route to fetch the total number of users
router.get('/total-users', async (req, res) => { 
  try {
    // Query to fetch the total number of users
    const result = await pool.query('SELECT COUNT(*) FROM users');
    
    // Send the total users count as a response
    res.status(200).json({
      totalUsers: result.rows[0].count,
    });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch user growth data (Monthly growth example)
router.get('/recent-users', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, first_name, last_name, email, created_at, enrolled_course_name
        FROM public.users
        ORDER BY created_at DESC
        LIMIT 10;  // You can adjust the limit as needed
      `);
      
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching recent users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports = router;
