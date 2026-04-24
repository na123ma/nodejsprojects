import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!formData.name || !formData.password) {
            setError("Please enter name and password");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage(res.data.message || "Login successful");

            const role = res.data.user.role;

            setTimeout(() => {
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your journey with a secure and modern experience."
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
                            placeholder="Enter your username"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="fancy-input-group">
                    <label>Password</label>
                    <div className="fancy-input-wrap">
                        <span className="input-icon">
                            <FaLock />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
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

                <button className="auth-btn premium-btn" type="submit" disabled={loading}>
                    <span>{loading ? "Logging in..." : "Login"}</span>
                    {!loading && <FaArrowRight />}
                </button>
            </form>
        </AuthLayout>
    );
}

export default Login;