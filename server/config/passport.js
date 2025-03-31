const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../config/db"); // PostgreSQL connection

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user info from Google profile
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const picture = photos[0].value;

        // Check if user exists in DB
        const existingUser = await pool.query("SELECT * FROM users WHERE google_id = $1", [id]);

        if (existingUser.rows.length > 0) {
          return done(null, existingUser.rows[0]); // User exists, proceed
        }

        // If new user, save in DB
        const newUser = await pool.query(
          "INSERT INTO users (google_id, name, email, picture) VALUES ($1, $2, $3, $4) RETURNING *",
          [id, displayName, email, picture]
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize & Deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  done(null, user.rows[0]);
});

module.exports = passport;
