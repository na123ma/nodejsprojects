import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUserShield,
    FaArrowRight,
} from "react-icons/fa";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.role
        ) {
            setError("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Password and confirm password do not match");
            return;
        }
        try {
            setLoading(true);
            const res = await API.post("/register", formData);
            setMessage(res.data.message || "Registration successful");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "user",
            });
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the platform with a stylish, responsive, and secure registration flow."
        >
            <form className="auth-form auth-form-animated" onSubmit={handleSubmit}>
                {message && <div className="success-box">{message}</div>}
                {error && <div className="error-box">{error}</div>}

                <div className="fancy-input-group">
                    <label>Name</label>
                    <div className="fancy-input-wrap">
                        <span className="input-icon">
                            <FaUser />
                        </span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="fancy-input-group">
                    <label>Email</label>
                    <div className="fancy-input-wrap">
                        <span className="input-icon">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="fancy-input-group">
                        <label>Password</label>
                        <div className="fancy-input-wrap">
                            <span className="input-icon">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="fancy-input-group">
                        <label>Confirm Password</label>
                        <div className="fancy-input-wrap">
                            <span className="input-icon">
                                <FaLock />
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="fancy-input-group">
                    <label>Role</label>
                    <div className="fancy-input-wrap">
                        <span className="input-icon">
                            <FaUserShield />
                        </span>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <button className="auth-btn premium-btn" type="submit" disabled={loading}>
                    <span>{loading ? "Registering..." : "Create Account"}</span>
                    {!loading && <FaArrowRight />}
                </button>
            </form>
        </AuthLayout>
    );
}

export default Register;