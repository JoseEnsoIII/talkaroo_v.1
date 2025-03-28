const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // PostgreSQL connection
const usersRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courses");
const enrollRoutes = require("./routes/enrollRoutes");
const vocabsRoutes = require("./routes/vocabsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const blogRoutes = require("./routes/blogRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const dashboardRoutes = require("./api/dashboardRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use API routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/vocabulary", vocabsRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use('/api/dashboard', dashboardRoutes); // Dashboard API route

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`- Server running on port ${PORT}`));
