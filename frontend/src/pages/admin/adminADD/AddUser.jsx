import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../utils/axiosInstance'
import { toast ,Toaster } from 'sonner'
import '../../../assets/styles/AddUser.css'
import {User,Mail,Phone,CheckCircle2,Lock, AlertCircle,ArrowLeft} from 'lucide-react'

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatephone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateName = (name) => {
    return /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: validateName(value)
          ? ""
          : "Name should only contain letters and single spaces between words",
      }));
    } else if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    } else if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: validatephone(value)
          ? ""
          : "phone number must be exactly 10 digits",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length >= 6 ? "" : "Password must be at least 6 characters",
      }));
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if (!formData.name || !validateName(formData.name) || !validateEmail(formData.email) || !validatephone(formData.phone) || !formData.password) {
          setErrors({
             name: !formData.name ? 'Name is required' : !validateName(formData.name) ? 'Name should only contain letters and single spaces between words' : '',
        email: !validateEmail(formData.email) ? 'Invalid email format' : '',
        phone: !validatephone(formData.phone) ? 'phone number must be exactly 10 digits' : '',
        password: formData.password.length < 6 ? 'Password must be at least 6 characters' : ''
      
          })  
          return
    }
    try {
        const response = await axiosInstance.post('/admin/adduser',formData)
        setMessage(response.message)

        toast.success('user has beed succesfully added')
        navigate('/admin/dashboard')
    } catch (error) {
        if(error.response && error.response.status==400){
            setErrors((prev) => ({
          ...prev,
          email: error.response.data.message
        }))
        } else{
            toast.error('Error adding user. Please try again later.');
        }
    }
      
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="add-user-container">
        <div className="add-user-card">
          <div className="card-header">
            <button 
          className="back-button" 
          onClick={() => navigate('/admin/dashboard')}
          disabled={isLoading}
        >
          <ArrowLeft className="icon" />
  
        </button>
            <h2 className="card-title">
              <User className="icon" />
              Add New User
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <User className="icon" />
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && (
                  <p className="error-message">
                    <AlertCircle className="icon" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <Mail className="icon" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                  <p className="error-message">
                    <AlertCircle className="icon" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <Phone className="icon" />
                  phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && (
                  <p className="error-message">
                    <AlertCircle className="icon" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <Lock className="icon" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                />
                {errors.password && (
                  <p className="error-message">
                    <AlertCircle className="icon" />
                    {errors.password}
                  </p>
                )}
              </div>

              <button type="submit" className="form-button">
                Save User
              </button>
            </form>

            {message && (
              <div className="success-message">
                <CheckCircle2 className="icon" />
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
