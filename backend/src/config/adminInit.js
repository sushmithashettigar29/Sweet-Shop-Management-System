const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdminIfNotExist = async () => {
  try {
    // Check if an admin user already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) return;

    // Set default admin credentials from environment variables or hardcoded values
    const username = process.env.ADMIN_USERNAME || "candyAdmin";
    const password = process.env.ADMIN_PASSWORD || "hse^fhts";

    // Hash the password for security
    const hashed = await bcrypt.hash(password, 10);
    // Create the new admin user
    const admin = await User.create({ username, password: hashed, role: "admin" });

    // Log success message
    console.log(`Admin created automatically: ${username} (id=${admin._id})`);
  } catch (err) {
    // Log error if creation fails
    console.error("Failed to create admin:", err);
  }
};

module.exports = createAdminIfNotExist;