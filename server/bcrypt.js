const argon2 = require('argon2');

const hashPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        console.log("Hashed password:", hash);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
    }
};

const checkPassword = async (inputPassword, storedHashedPassword) => {
    try {
        const isMatch = await argon2.verify(storedHashedPassword, inputPassword);
        console.log(isMatch ? "✅ Login successful!" : "❌ Invalid credentials");
    } catch (err) {
        console.error("Error verifying password:", err);
    }
};

// Example usage:
hashPassword("admin123").then((hashed) => checkPassword("admin123", hashed));
