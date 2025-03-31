const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models/userModel"); // Assuming you're using an ORM like Sequelize or Mongoose
require("dotenv").config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5001/api/auth/google/callback";

// Google OAuth Callback
router.post("/google/callback", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Authorization code missing" });

    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    if (!data || !data.id_token) {
      return res.status(400).json({ error: "Google authentication failed. No ID token returned." });
    }

    const { id_token } = data;

    // Use Google Auth Library to verify the ID token
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,  // Specify the client ID for the app you're using
    });

    const payload = ticket.getPayload();

    // Check if user exists in DB, otherwise create a new user
    let user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      // Create a new user if not found
      user = await User.create({
        username: payload.name.split(" ").join("_"), // Create username by joining name parts
        email: payload.email,
        first_name: payload.given_name,
        last_name: payload.family_name,
        profile_image: payload.picture,
        password: "", // Password is not needed for Google login
        role: "client", // Default role for new users
      });
    }

    // Create JWT for the user
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token and user data
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Google OAuth error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
});

module.exports = router;
