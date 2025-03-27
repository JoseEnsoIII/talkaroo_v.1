const express = require("express");
const pool = require("../config/pool");
const router = express.Router();

router.post("/enroll", async (req, res) => {
  const { email, course_id, level } = req.body;

  if (!email || !course_id || !level) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Get user_id based on email
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = userResult.rows[0].id;

    // Check if user is already enrolled
    const enrollmentCheck = await pool.query(
      "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2",
      [user_id, course_id]
    );

    if (enrollmentCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User already enrolled in this course." });
    }

    // Insert enrollment
    const insertQuery = `
  INSERT INTO enrollments (user_id, course_id, level, enrollment_date)
  VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
  RETURNING enrollment_id`;

    const result = await pool.query(insertQuery, [user_id, course_id, level]);

    return res.status(201).json({
      message: "Enrollment successful",
      enrollment_id: result.rows[0].enrollment_id,
    });
  } catch (error) {
    console.error("Error enrolling user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/test", (req, res) => {
  res.json({ message: "Route works!" });
});

router.get("/recent-enrollees", async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        u.email,
        u.created_at AS joined,
        u.enrolled_course_name AS course,
        e.completed,
        e.current_week
      FROM users u
      LEFT JOIN enrollments e ON u.id = e.user_id
      WHERE u.created_at >= NOW() - INTERVAL '7 days'
      ORDER BY u.created_at DESC
      LIMIT 10
    `;

    const { rows } = await pool.query(query);

    const recentUsers = rows.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      joined: user.joined,
      enrolled: user.course !== null,
      completed: user.completed || false,
      currentWeek: user.current_week || 0,
    }));

    return res.json(recentUsers);
  } catch (err) {
    console.error("Error fetching recent enrollees:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
