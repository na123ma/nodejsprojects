import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import {
    FaHome,
    FaUsers,
    FaFileAlt,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaSearch,
    FaBell,
    FaPlus,
    FaUserShield,
    FaClipboardList,
    FaTasks,
    FaRegChartBar,
} from "react-icons/fa";

function AdminDashboard() {
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
        { name: "Manage Users", icon: <FaUsers /> },
        { name: "Reports", icon: <FaFileAlt /> },
        { name: "Analytics", icon: <FaChartBar /> },
        { name: "Settings", icon: <FaCog /> },
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case "Dashboard":
                return (
                    <>
                        <section className="hero-board">
                            <div className="hero-left">
                                <span className="hero-badge">Admin Overview</span>
                                <h1>
                                    Welcome, <span>{user?.name || "Admin"}</span>
                                </h1>
                                <p>
                                    Monitor the platform, manage operations, review activity, and
                                    keep the whole system under control from one place.
                                </p>

                                <div className="hero-stats">
                                    <div className="hero-stat-card">
                                        <h3>27</h3>
                                        <p>Active Tasks</p>
                                    </div>
                                    <div className="hero-stat-card">
                                        <h3>1,250</h3>
                                        <p>Total Users</p>
                                    </div>
                                    <div className="hero-stat-card">
                                        <h3>320</h3>
                                        <p>Reports</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-right">
                                <div className="graph-card">
                                    <div className="graph-header">
                                        <span>Weekly Performance</span>
                                        <FaRegChartBar />
                                    </div>

                                    <div className="fake-chart">
                                        <div className="wave wave-1"></div>
                                        <div className="wave wave-2"></div>
                                        <div className="wave wave-3"></div>
                                    </div>

                                    <div className="graph-footer">
                                        <span>Users Growth</span>
                                        <strong>+18%</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content-grid">
                            <div className="panel-card large-panel">
                                <div className="panel-header">
                                    <h2>Admin Operations</h2>
                                    <button className="soft-btn">
                                        <FaPlus />
                                    </button>
                                </div>

                                <div className="operation-grid">
                                    <div className="operation-box">
                                        <div className="operation-icon aqua">
                                            <FaUsers />
                                        </div>
                                        <h4>User Control</h4>
                                        <p>Add, update, block, and manage registered users.</p>
                                    </div>

                                    <div className="operation-box">
                                        <div className="operation-icon blue">
                                            <FaClipboardList />
                                        </div>
                                        <h4>Reports Review</h4>
                                        <p>Track submitted reports and action updates quickly.</p>
                                    </div>

                                    <div className="operation-box">
                                        <div className="operation-icon yellow">
                                            <FaTasks />
                                        </div>
                                        <h4>Task Monitoring</h4>
                                        <p>Monitor ongoing operations and pending activities.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-card side-panel">
                                <div className="panel-header">
                                    <h2>Team</h2>
                                    <span className="mini-dot"></span>
                                </div>

                                <div className="member-list">
                                    <div className="member-item">
                                        <div className="member-avatar">A</div>
                                        <div>
                                            <h4>Arjun</h4>
                                            <p>System Manager</p>
                                        </div>
                                        <span className="member-badge">3</span>
                                    </div>

                                    <div className="member-item">
                                        <div className="member-avatar">N</div>
                                        <div>
                                            <h4>Neha</h4>
                                            <p>Reports Lead</p>
                                        </div>
                                        <span className="member-badge">1</span>
                                    </div>

                                    <div className="member-item">
                                        <div className="member-avatar">R</div>
                                        <div>
                                            <h4>Rahul</h4>
                                            <p>User Support</p>
                                        </div>
                                        <span className="member-badge">5</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bottom-grid">
                            <div className="panel-card">
                                <div className="panel-header">
                                    <h2>Quick Summary</h2>
                                </div>

                                <div className="summary-grid">
                                    <div className="summary-box">
                                        <span>Role</span>
                                        <strong>{user?.role || "Admin"}</strong>
                                    </div>

                                    <div className="summary-box">
                                        <span>Status</span>
                                        <strong>Active</strong>
                                    </div>

                                    <div className="summary-box">
                                        <span>Access</span>
                                        <strong>Full Control</strong>
                                    </div>

                                    <div className="summary-box">
                                        <span>Email</span>
                                        <strong>{user?.email || "Not Available"}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-card">
                                <div className="panel-header">
                                    <h2>Notifications</h2>
                                </div>

                                <div className="notification-list">
                                    <div className="notice-item">
                                        <p>New report submitted by a user.</p>
                                        <span>2 min ago</span>
                                    </div>
                                    <div className="notice-item">
                                        <p>Analytics updated successfully.</p>
                                        <span>18 min ago</span>
                                    </div>
                                    <div className="notice-item">
                                        <p>System backup completed.</p>
                                        <span>1 hr ago</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                );

            case "Manage Users":
                return (
                    <section className="single-page-panel">
                        <div className="panel-header">
                            <h1>Manage Users</h1>
                            <button className="primary-action-btn">Add User</button>
                        </div>

                        <div className="table-card">
                            <div className="table-head">
                                <span>Name</span>
                                <span>Email</span>
                                <span>Role</span>
                                <span>Status</span>
                            </div>

                            <div className="table-row">
                                <span>Naresh</span>
                                <span>naresh@email.com</span>
                                <span>User</span>
                                <span className="status-pill active">Active</span>
                            </div>

                            <div className="table-row">
                                <span>Ravi</span>
                                <span>ravi@email.com</span>
                                <span>Admin</span>
                                <span className="status-pill pending">Pending</span>
                            </div>

                            <div className="table-row">
                                <span>Sneha</span>
                                <span>sneha@email.com</span>
                                <span>User</span>
                                <span className="status-pill active">Active</span>
                            </div>
                        </div>
                    </section>
                );

            case "Reports":
                return (
                    <section className="single-page-panel">
                        <div className="panel-header">
                            <h1>Reports</h1>
                            <button className="primary-action-btn">Export</button>
                        </div>

                        <div className="report-cards">
                            <div className="report-box">
                                <h3>Pending Reports</h3>
                                <p>18 reports are waiting for review.</p>
                            </div>
                            <div className="report-box">
                                <h3>Resolved Reports</h3>
                                <p>124 reports completed this month.</p>
                            </div>
                            <div className="report-box">
                                <h3>Critical Reports</h3>
                                <p>4 high-priority issues need attention.</p>
                            </div>
                        </div>
                    </section>
                );

            case "Analytics":
                return (
                    <section className="single-page-panel">
                        <div className="panel-header">
                            <h1>Analytics</h1>
                            <button className="primary-action-btn">Refresh</button>
                        </div>

                        <div className="analytics-grid">
                            <div className="analytic-box">
                                <h3>User Growth</h3>
                                <p>+18% this week</p>
                            </div>
                            <div className="analytic-box">
                                <h3>Engagement</h3>
                                <p>76% active interaction</p>
                            </div>
                            <div className="analytic-box">
                                <h3>Traffic</h3>
                                <p>8.2K page visits</p>
                            </div>
                        </div>
                    </section>
                );

            case "Settings":
                return (
                    <section className="single-page-panel">
                        <div className="panel-header">
                            <h1>Settings</h1>
                            <button className="primary-action-btn">Save</button>
                        </div>

                        <div className="settings-list">
                            <div className="settings-item">
                                <h3>Profile Settings</h3>
                                <p>Update account name, email, and admin details.</p>
                            </div>
                            <div className="settings-item">
                                <h3>Security</h3>
                                <p>Change password and protect admin access.</p>
                            </div>
                            <div className="settings-item">
                                <h3>Notifications</h3>
                                <p>Control system alert and report notifications.</p>
                            </div>
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };
    return (
        <div className="vital-admin-layout">
            <div
                className={`vital-sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside className={`vital-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div>
                    <div className="vital-brand">
                        <div className="vital-logo-box">A</div>
                        <div>
                            <h2>Adminity</h2>
                            <p>Control panel</p>
                        </div>
                    </div>

                    <div className="vital-menu">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`vital-menu-item ${activeMenu === item.name ? "active" : ""
                                    }`}
                                onClick={() => {
                                    setActiveMenu(item.name);
                                    setSidebarOpen(false);
                                }}
                            >
                                <span className="vital-menu-icon">{item.icon}</span>
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="vital-sidebar-footer">
                    <button className="logout-vital-btn" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Go Out</span>
                    </button>
                </div>

                <button
                    className="sidebar-close-mobile"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaTimes />
                </button>
            </aside>

            <main className="vital-main">
                <div className="vital-topbar">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FaBars />
                    </button>

                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>

                    <div className="topbar-actions">
                        <button className="notify-btn">
                            <FaBell />
                            <span className="notify-dot"></span>
                        </button>

                        <div className="top-user-chip">
                            <div className="top-user-avatar">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <span>{user?.name || "Admin"}</span>
                        </div>
                    </div>
                </div>

                <div className="content-animate">{renderContent()}</div>
            </main>
        </div>
    );
}

export default AdminDashboard;