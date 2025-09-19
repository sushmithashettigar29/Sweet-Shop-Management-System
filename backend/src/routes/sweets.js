// backend/src/routes/sweets.js
const express = require("express");
const router = express.Router();
const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  getSweetById
} = require("../controllers/sweetController");
const { protect, admin } = require("../middleware/authMiddleware");

// Admin-only routes
router.post("/", protect, admin, addSweet);
router.put("/:id", protect, admin, updateSweet);
router.delete("/:id", protect, admin, deleteSweet);
router.post("/:id/restock", protect, admin, restockSweet);

router.get("/:id",protect, getSweetById);

// User routes (authenticated)
router.get("/", protect, getSweets);
router.get("/search", protect, searchSweets);
router.post("/:id/purchase", protect, purchaseSweet);

module.exports = router;