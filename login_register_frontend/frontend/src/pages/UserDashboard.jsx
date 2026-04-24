import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import {
    FaHome,
    FaUser,
    FaEnvelope,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaClipboardList,
    FaCog,
} from "react-icons/fa";

function UserDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    const menuItems = [
        { name: "Dashboard", icon: <FaHome /> },
        { name: "Profile", icon: <FaUser /> },
        { name: "Messages", icon: <FaEnvelope /> },
        { name: "Activity", icon: <FaClipboardList /> },
        { name: "Settings", icon: <FaCog /> },
    ];
    return (
        <div className="dashboard-layout">
            <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-top">
                    <div className="sidebar-brand">
                        <div className="brand-logo">U</div>
                        <div>
                            <h2>User Panel</h2>
                            <p>Welcome Portal</p>
                        </div>
                    </div>
                    <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
                        <FaTimes />
                    </button>
                </div>
                <div className="sidebar-profile">
                    <div className="sidebar-avatar">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h3>{user?.name || "User"}</h3>
                    <p>{user?.email || "user@example.com"}</p>
                </div>
                <nav className="sidebar-menu">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`menu-item ${activeMenu === item.name ? "active" : ""}`}
                            onClick={() => {
                                setActiveMenu(item.name);
                                setSidebarOpen(false);
                            }}>
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>
                <div className="sidebar-bottom">
                    <button className="logout-sidebar-btn" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="dashboard-main">
                <div className="topbar">
                    <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)}>
                        <FaBars />
                    </button>

                    <div className="topbar-right">
                        <div className="topbar-user">
                            <div className="mini-avatar">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <span>{user?.name || "User"}</span>
                        </div>
                    </div>
                </div>
                <div className="welcome-board">
                    <div className="welcome-content">
                        <span className="welcome-tag">Welcome Back</span>
                        <h1>
                            Hello, <span>{user?.name || "User"}</span> 👋
                        </h1>
                        <p>
                            We are glad to have you here again. Manage your profile, explore your activity,
                            and stay updated with your account details.
                        </p>
                    </div>
                    <div className="welcome-visual">
                        <div className="visual-circle one"></div>
                        <div className="visual-circle two"></div>
                        <div className="visual-card">
                            <h3>Account Status</h3>
                            <p>Active and Ready</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="dashboard-card animated-card">
                        <h4>Username</h4>
                        <p>{user?.name || "Not Available"}</p>
                    </div>

                    <div className="dashboard-card animated-card">
                        <h4>Email Address</h4>
                        <p>{user?.email || "Not Available"}</p>
                    </div>

                    <div className="dashboard-card animated-card">
                        <h4>Role</h4>
                        <p>{user?.role || "User"}</p>
                    </div>

                    <div className="dashboard-card animated-card">
                        <h4>Status</h4>
                        <p>Active</p>
                    </div>
                </div>

                <div className="profile-details-section">
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <div className="profile-big-avatar">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>

                            <div>
                                <h2>{user?.name || "User Name"}</h2>
                                <p>{user?.email || "user@example.com"}</p>
                            </div>
                        </div>

                        <div className="profile-info-grid">
                            <div className="profile-info-box">
                                <span>Full Name</span>
                                <strong>{user?.name || "Not Available"}</strong>
                            </div>

                            <div className="profile-info-box">
                                <span>Email</span>
                                <strong>{user?.email || "Not Available"}</strong>
                            </div>

                            <div className="profile-info-box">
                                <span>Role</span>
                                <strong>{user?.role || "User"}</strong>
                            </div>

                            <div className="profile-info-box">
                                <span>Membership</span>
                                <strong>Standard User</strong>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button className="primary-btn">View Profile</button>
                            <button className="danger-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserDashboard;