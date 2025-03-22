const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // PostgreSQL connection

// Get all language courses
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM language_courses");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a single language course by ID
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const result = await pool.query("SELECT * FROM language_courses WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching course:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a language course by course name
router.get("/name/:courseName", async (req, res) => {
    try {
        const { courseName } = req.params;

        const result = await pool.query(
            "SELECT * FROM language_courses WHERE course_name = $1",
            [courseName]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching course by name:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new language course
router.post("/", async (req, res) => {
    try {
        const { course_name } = req.body;
        if (!course_name) {
            return res.status(400).json({ error: "Course name is required" });
        }

        const result = await pool.query(
            "INSERT INTO language_courses (course_name) VALUES ($1) RETURNING *",
            [course_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding course:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update an existing language course
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const { course_name } = req.body;
        if (!course_name) {
            return res.status(400).json({ error: "Course name is required" });
        }

        const result = await pool.query(
            "UPDATE language_courses SET course_name = $1 WHERE id = $2 RETURNING *",
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

// Delete a language course
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const result = await pool.query("DELETE FROM language_courses WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("Error deleting course:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
