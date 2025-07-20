import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/UserSlice";
import "../../assets/styles/Profile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLogoutPopUpVisible, setIsLogoutPopUpVisible] = useState(false);

  function handleEdit() {
    const confirmEdit = window.confirm("do you want to edit your profile ?");
    if (confirmEdit) {
      navigate("/edit");
    }
  }

  function handleLogout() {
    setIsLogoutPopUpVisible(true);
  }

  const confirmLogout = async () => {
    dispatch(logout());
    await axiosInstance.post("/user/logout");
    navigate("/home");
  };

  function cancelLogout() {
    setIsLogoutPopUpVisible(false);
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h1>User Profile</h1>
        {error && <p className="error">{error}</p>}
        <div className="profile-image-container">
          {/* <img
            src={
              user?.profilePicture?.includes('uploads/')
                ? `${import.meta.env.VITE_BASE_IMG_URL}/${user.profilePicture}`
                : `${import.meta.env.VITE_BASE_IMG_URL}/uploads/${user?.profilePicture} `
            }
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.src = '/src/assets/dummy.jpg'
            }}
          /> */}
          <img
            src={
              user?.profilePicture
                ? `${import.meta.env.VITE_BASE_IMG_URL.replace(
                    /\/$/,
                    ""
                  )}/${user.profilePicture.replace(/^\//, "")}`
                : "/src/assets/dummy.jpg"
            }
            alt={user.userName}
            className="profile-image"
          />
        </div>
        {user ? (
          <div className="profile-info">
            <div className="info-item">
              <User size={20} />
              <p>
                <b>Name:</b> {user.userName}
              </p>
            </div>
            <div className="info-item">
              <Mail size={20} />
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
            <div className="info-item">
              <Phone size={20} />
              <p>
                <b>Mobile:</b> {user.phone}
              </p>
            </div>
          </div>
        ) : (
          <p className="loading">Loading profile...</p>
        )}
        <div className="button-container">
          <button onClick={handleEdit} className="edit-button">
            <Edit2 size={16} />
            Edit
          </button>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
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
  );
};

export default UserProfile;
