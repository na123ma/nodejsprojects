const bcrypt = require("bcrypt");
const users = require("../data/users");
const generateToken = require("../utils/generateToken");

let currentId = 1;

const register = async(req, res, next) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;
        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password did not match",
            });
        }
        const existingUser = users.find(
            (user) =>
            user.email === email || user.name.toLowerCase() === name.toLowerCase()
        );
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with same name or email",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: currentId++,
            name,
            email,
            password: hashedPassword,
            role,
        };
        users.push(newUser);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};
const login = async(req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                success: false,
                message: "Name and password are required",
            });
        }
        const user = users.find(
            (u) => u.name.toLowerCase() === name.toLowerCase()
        );
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user,
    });
};
const adminDashboard = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
        user: req.user,
    });
};
const userDashboard = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome User",
        user: req.user,
    });
};
module.exports = {
    register,
    login,
    getProfile,
    adminDashboard,
    userDashboard,
};