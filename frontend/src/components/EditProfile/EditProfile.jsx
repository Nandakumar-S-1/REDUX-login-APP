import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/slice/UserSlice";
import { User, Mail, Phone, Save, Image } from "lucide-react";
import { toast, Toaster } from "sonner";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileImage, setProfileImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(
        `${import.meta.env.VITE_BASE_IMG_URL}/${user.profileImage}`
      );
    }
  },[user]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChange = async () => {
    setNameError('');
    setEmailError('');
    setPhoneError('');

    if (!name || !/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name)) {
      setNameError('Name should only contain letters and single spaces between words');
      return;
    }

    if (!email || !validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!phone || !validatePhone(phone)) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    const formData = new FormData();
    formData.append('username', name);
    formData.append('email', email);
    formData.append('phone', phone);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axiosInstance.put(`/user/update/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        const data = response.data;
        toast.success('Profile updated successfully!');
        dispatch(updateUser(data.user));
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const handleConfirmSave = () => {
    setIsPopupVisible(false);
    handleSaveChange();
  };

  const handleCancelSave = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h1 className="edit-profile-title">Edit Profile</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="image-upload">
              <label htmlFor="profile-image">
                {previewImage ? (
                  <img src={previewImage} alt="Profile Preview" className="profile-image-preview" />
                ) : (
                  <div className="image-placeholder">
                    <Image size={40} />
                    <span>Upload Image</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profile-image"
                onChange={handleImageChange}
                className="hidden-input"
                aria-label="Upload profile image"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">
                <User size={20} aria-hidden="true" />
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                aria-invalid={!!nameError}
                aria-describedby="name-error"
              />
              {nameError && <p id="name-error" className="error">{nameError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={20} aria-hidden="true" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && <p id="email-error" className="error">{emailError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">
                <Phone size={20} aria-hidden="true" />
                Phone
              </label>
              <input
                type="tel"
                id="mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                aria-invalid={!!phoneError}
                aria-describedby="phone-error"
              />
              {phoneError && <p id="phone-error" className="error">{phoneError}</p>}
            </div>

            <button
              type="button"
              className="save-button"
              onClick={() => setIsPopupVisible(true)}
              aria-label="Save Changes"
            >
              <Save size={20} aria-hidden="true" />
              Save Changes
            </button>
          </form>
          {isPopupVisible && (
            <div className="confirmation-popup" role="dialog" aria-labelledby="confirm-title">
              <div className="popup-content">
                <h3 id="confirm-title">Are you sure you want to save these changes?</h3>
                <div className="popup-buttons">
                  <button className="confirm-btn" onClick={handleConfirmSave}>
                    Confirm
                  </button>
                  <button className="cancel-btn" onClick={handleCancelSave}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditProfile;
