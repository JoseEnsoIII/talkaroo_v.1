const express = require('express');
const pool = require('../config/db'); // PostgreSQL database connection
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT e.enrollment_id, e.user_id, e.course_id, e.enrollment_date,
                lc.course_name, lc.native_name, lc.course_level, lc.course_price
         FROM enrollments e
         JOIN language_courses lc ON e.course_id = lc.course_id`
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // POST - Enroll a user in a course
  router.post("/", async (req, res) => {
    try {
      const { user_id, course_id } = req.body;
      if (!user_id || !course_id) {
        return res.status(400).json({ error: "User ID and Course ID are required" });
      }
  
      // Check if user exists
      const userCheck = await pool.query("SELECT user_id FROM users WHERE user_id = 1", [user_id]); 
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ error: "User does not exist" });
      }
  
      // Check if course exists
      const courseCheck = await pool.query("SELECT course_name FROM language_courses WHERE course_id = $1", [course_id]);
      if (courseCheck.rows.length === 0) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // Check if the user is already enrolled
      const enrollmentCheck = await pool.query(
        "SELECT enrollment_id FROM enrollments WHERE user_id = $1 AND course_id = $2",
        [user_id, course_id]
      );
      if (enrollmentCheck.rows.length > 0) {
        return res.status(409).json({ error: "User is already enrolled in this course" });
      }
  
      // Insert enrollment record
      const enrollResult = await pool.query(
        "INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING enrollment_id",
        [user_id, course_id]
      );
  
      res.json({
        message: "Enrollment successful!",
        enrollment_id: enrollResult.rows[0].enrollment_id,
        user_id,
        course_id,
        course_name: courseCheck.rows[0].course_name
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
