import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaShieldAlt,
    FaRocket,
    FaUserCheck,
    FaChartLine,
} from "react-icons/fa";
import "./Auth.css";

function AuthLayout({ title, subtitle, children }) {
    const location = useLocation();

    return (
        <div className="auth-page">
            <div className="animated-bg">
                <span className="bg-circle circle-1"></span>
                <span className="bg-circle circle-2"></span>
                <span className="bg-circle circle-3"></span>
                <span className="bg-circle circle-4"></span>
            </div>

            <div className="auth-left">
                <div className="auth-brand-box">
                    <span className="brand-tag">Modern Access Portal</span>
                    <h1>
                        Secure Access with
                        <span className="gradient-text"> Smooth Experience</span>
                    </h1>
                    <p>
                        A clean authentication interface with glassmorphism, modern
                        animations, responsive layout, and a premium user experience.
                    </p>

                    <div className="auth-feature-list">
                        <div className="auth-feature-card">
                            <span><FaShieldAlt /></span>
                            <h4>Secure Authentication</h4>
                            <p>Built for role-based access and trusted login flow.</p>
                        </div>

                        <div className="auth-feature-card">
                            <span><FaRocket /></span>
                            <h4>Fast Experience</h4>
                            <p>Smooth transitions and elegant responsive design.</p>
                        </div>

                        <div className="auth-feature-card">
                            <span><FaUserCheck /></span>
                            <h4>User Friendly</h4>
                            <p>Clean forms with clear actions and polished interactions.</p>
                        </div>

                        <div className="auth-feature-card">
                            <span><FaChartLine /></span>
                            <h4>Professional UI</h4>
                            <p>Modern visuals for login and registration pages.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-card glass-card">
                    <div className="auth-tabs">
                        <Link
                            to="/login"
                            className={location.pathname === "/login" ? "active-tab" : ""}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className={location.pathname === "/register" ? "active-tab" : ""}
                        >
                            Register
                        </Link>
                    </div>

                    <div className="form-head">
                        <h2>{title}</h2>
                        <p className="auth-subtitle">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;