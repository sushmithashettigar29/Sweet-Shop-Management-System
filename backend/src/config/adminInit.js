const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdminIfNotExist = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) return;

    const username = process.env.ADMIN_USERNAME || "candyAdmin";
    const password = process.env.ADMIN_PASSWORD || "hse^fhts";

    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({ username, password: hashed, role: "admin" });

    console.log(`Admin created automatically: ${username} (id=${admin._id})`);
  } catch (err) {
    console.error("Failed to create admin:", err);
  }
};

module.exports = createAdminIfNotExist;