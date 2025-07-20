import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import '../../assets/styles/Signup.css'
const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: null,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [error, setError] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: "",
  });

  const validateUserName = (userName) => {
    const namePattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!namePattern.test(userName)) {
      return "Name should not contain any characters or numbers";
    }
    return "";
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      return "Phone number should be exactly 10 digits";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Enter a valid email";
    }
    return "";
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      return "Password must be at least 6 characters with 1 uppercase and 1 number";
    }
    return "";
  };

  const validateprofilePicture = (file) => {
    if (!file) {
      return "profile picture is needed";
    }
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return "Not a valid format, only PNG,JPG,JPEG types are allowe";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "file size should be under 2MB";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "userName") {
      setError((p) => ({ ...p, userName: validateUserName(value) }));
    } else if (name === "phone") {
      setError((p) => ({ ...p, phone: validatePhone(value) }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Im here");
    const nameError = validateUserName(formData.userName);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const profilePictureError = validateprofilePicture(formData.profilePicture);

    setError({
      userName: nameError,
      phone: phoneError,
      email: emailError,
      password: passwordError,
      profilePicture: profilePictureError,
    });

    if (
      nameError ||
      phoneError ||
      emailError ||
      passwordError ||
      profilePictureError
    ) {
      return;
    }

    //proceedin with submision
    // const formDataToSend = new FormData();
    // formDataToSend.append("userName", formData.userName);
    // console.log('ddddddddd')
    // formDataToSend.append("email", formData.email);
    // formDataToSend.append("phone", formData.phone);
    // formDataToSend.append("password", formData.password);
    // // if (formData.profilePicture) {
    // //   formDataToSend.append("profilePicture", formData.profilePicture);
    // // }
    // console.log('jjjjjjjjjjjjjjjjjjjjjjjjjj',formDataToSend)
    try {
      console.log("Im here 2");
      const response = await axiosInstance.post("/auth/signup", {
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profilePicture : formData.profilePicture
      });

      // console.log("aaaaaaa", formDataToSend);
      setMessage(response.data.message);
      toast.success("Registration Succesful");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMes = error.response?.data?.message || "signup failed";
      setMessage(errorMes);
      toast.error(errorMes);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="signup-container">
        <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className={`form-input ${error.userName ? "input-error" : ""}`}
            />
            {error.userName && (
              <p className="error-message">{error.userName}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${error.email ? "input-error" : ""}`}
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${error.phone ? "input-error" : ""}`}
            />
            {error.phone && <p className="error-message">{error.phone}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
            {error.password && (
              <p className="error-message">{error.password}</p>
            )}
          </div>
          
          <div className="form-group">
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="form-file-input"
            />
            {error.profilePicture && (
              <p className="error-message">{error.profilePicture}</p>
            )}
          </div>
          {/* <button type="submit" className="submit-btn" disabled={!error.userName || !!error.phone}>Sign Up</button> */}
          <button
            type="submit"
            className="submit-btn"
            disabled={
              !!error.userName ||
              !!error.phone ||
              !!error.email ||
              !!error.password ||
              !!error.profilePicture ||
              !formData.userName ||
              !formData.email ||
              !formData.phone ||
              !formData.password ||
              !formData.profilePicture
            }
          >
            Sign Up
          </button>
        </form>
        <a className="signup-link" href="/">
            Sign In
          </a>
        {message && <p className="signup-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default SignUp;
