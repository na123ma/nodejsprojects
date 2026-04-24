const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    adminDashboard,
    userDashboard,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, roleMiddleware("admin"), adminDashboard);
router.get("/user", authMiddleware, roleMiddleware("user", "admin"), userDashboard);

module.exports = router;