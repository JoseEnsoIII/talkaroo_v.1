const express = require("express");
const pool = require("../config/db"); // Import database connection
const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single blog by ID
router.get("/blogs/:id", async (req, res) => {
    const { id } = req.params;
  
    // Validate that ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid blog ID." });
    }
  
    try {
      const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Blog post not found." });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  

// Create a new blog
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

    const result = await pool.query(
      "INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a blog
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await pool.query(
      "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
