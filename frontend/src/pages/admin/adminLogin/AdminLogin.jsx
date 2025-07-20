import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { adminLogin } from "../../../redux/slice/AdminSlice";
import { toast,Toaster } from "sonner";
import '../../../assets/styles/AdminLogin.css'

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePass = (password) => {
    return password.length >= 6;
  };
  useEffect(() => {

    if (email && !validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    if (password && !validatePass(password)) {
      setPasswordError("Password should contail atleast 6 characters");
    } else {
      setPasswordError("");
    }
  }, [email, password]);
          console.log("AdminLogin rendered");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    console.log("--------------------------AdminLogin rendered222");


    let isFormValid = true;
    if (!email) {
      setEmailError("Email  is required");
      isFormValid = false;
    }
    if (!password) {
      setPasswordError("password is required");
      isFormValid = false;
    }

    if (!isFormValid) return;

    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      const { admin } = response.data;
      dispatch(adminLogin({ admin }));
      navigate("/admin/home");
    } catch (error) {
      toast.error("Login failed. Please check your credentials", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="admin-login">
        <div className="login-container">
          <h2 className="admin-header">Admin Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin} className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "error" : ""}
                  placeholder="Enter your email"
                />
              </div>
              {emailError && <p className="ad-l-error">{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "error" : ""}
                  placeholder="Enter your password"
                />
              </div>
              {passwordError && <p className="ad-l-error">{passwordError}</p>}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
