import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { adminLogout } from "../../../redux/slice/AdminSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admin);

  const navigate = useNavigate();
  const [isLogoutPopUpVisible, setIsLogoutPopUpVisible] = useState(false);

  const handleLogout = async () => {
    setIsLogoutPopUpVisible(true);
  };
  const confirmLogout = async () => {
    await axiosInstance.post("/admin/logout");
    dispatch(adminLogout());
  };
  const cancelLogout = () => {
    setIsLogoutPopUpVisible(false);
  };
  const handleDashButton = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="admin-home-page">
        <header className="header">
          <div className="container">
            <h1 className="logo">Admin Panel</h1>
            <div className="header-buttons">
              <button className="btn btn-dashboard" onClick={handleDashButton}>
                <span className="icon icon-dashboard"></span>
                Dashboard
              </button>
              <button className="btn btn-logout" onClick={handleLogout}>
                <span className="icon icon-logout"></span>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <div className="admin-card">
              <div className="admin-info">
                <div className="admin-avatar">
                  {admin.profileImage ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_IMG_URL}/${
                        admin.profileImage
                      }`}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {admin.username.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="admin-details">
                  <h2 className="admin-name">Welcome, {admin.username}</h2>
                  <p className="admin-role">Administrator</p>
                </div>
              </div>
              <div className="admin-contact">
                <span className="icon icon-email"></span>
                <span>{admin.email}</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Admin Panel. All rights reserved.</p>
          </div>
        </footer>
        {isLogoutPopUpVisible && (
          <div className="confirmation-popup">
            <div className="popup-content">
              <h3>Are you sure you want to log out?</h3>
              <button className="confirm-btn" onClick={confirmLogout}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={cancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminHome;
