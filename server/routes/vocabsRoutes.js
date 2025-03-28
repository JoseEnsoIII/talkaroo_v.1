const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Database connection

// Fetch vocabulary (optionally filter by course_id)
router.get('/', async (req, res) => {
    try {
        console.log("Query Parameters:", req.query);
        const courseId = req.query.course_id ? Number(req.query.course_id) : null;

        let query = `
        SELECT vocab_id, vocab_title, vocab_title_description, examples, image_url, course_id 
        FROM vocabulary
    `;
    
        let values = [];

        if (courseId && !isNaN(courseId) && courseId > 0) {
            query += ` WHERE course_id = $1`;
            values.push(courseId);
        }

        const { rows } = await pool.query(query, values);

        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching vocabulary:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
