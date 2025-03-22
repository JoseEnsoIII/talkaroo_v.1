const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  } = require("../Controllers/userController");
const pool = require("../config/db"); // ✅ Ensure correct import

// ✅ Fix: Proper async route handler
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        return res.json(rows); // ✅ Use `return` to prevent multiple responses
    } catch (err) {
        console.error("❌ Database Query Error:", err.message);
        return res.status(500).json({ error: "Server Error" });
    }
});

// Define user routes properly
// GET /api/users - fetch all users
router.get("/", getUsers);

// GET /api/users/:id - fetch a single user by ID
router.get("/:id", getUserById);

// POST /api/users - create a new user
router.post("/", createUser);

// PUT /api/users/:id - update a user
router.put("/:id", updateUser);

// DELETE /api/users/:id - delete a user
router.delete("/:id", deleteUser);

module.exports = router;
