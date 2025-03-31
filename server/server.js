const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // PostgreSQL connection
const usersRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleRoutes");
const courseRoutes = require("./routes/courses");
const enrollRoutes = require("./routes/enrollRoutes");
const vocabsRoutes = require("./routes/vocabsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const blogRoutes = require("./routes/blogRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const dashboardRoutes = require("./api/dashboardRoutes");
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Set security headers for all responses
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  next();
});

// Use API routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes); // Google OAuth
app.use("/api/courses", courseRoutes);
app.use("/api/vocabulary", vocabsRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/dashboard", dashboardRoutes); // Dashboard API route

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`- Server running on port ${PORT}`));
