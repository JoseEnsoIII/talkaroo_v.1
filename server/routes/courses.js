const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // PostgreSQL connection

router.param('id', (req, res, next, id) => {
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid course ID format" });
    }
    next();
  });

// Get all language courses
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT course_id, course_name, description, country_flag, native_name, levels 
            FROM language_courses
        `);
        
        
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM language_courses WHERE course_id = $1",
      [parseInt(id)] // Ensure numeric type
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Get a course by name
router.get("/name/:courseName", async (req, res) => {
    try {
        const { courseName } = req.params;
        const result = await pool.query("SELECT * FROM language_courses WHERE course_name = $1", [courseName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching course by name:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a course
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { course_name } = req.body;

        if (!course_name) {
            return res.status(400).json({ error: "Course name is required" });
        }

        const result = await pool.query(
            "UPDATE language_courses SET course_name = $1 WHERE course_id = $2 RETURNING *",
            [course_name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating course:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a course
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("DELETE FROM language_courses WHERE course_id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json({ message: "Course deleted successfully", course: result.rows[0] });
    } catch (err) {
        console.error("Error deleting course:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
