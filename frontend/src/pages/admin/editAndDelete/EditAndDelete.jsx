import React, { useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance'
import {toast,Toaster} from 'sonner'
import {User,Mail,Save,Phone,X} from 'lucide-react'
import '../../../assets/styles/EditAndDelete.css'

const EditAndDelete = ({user,onSave,onCancel,update}) => {
    const [formData,setFormData]=useState({
        name:user.username,
        email: user.email,
        mobile: user.phone
    })

    const [showConfirm,setShowConfirm]=useState(false)
    const [errors,setErrors]=useState({
        name:'',
        email:'',
        mobile:''
    })
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  }

  const validateName = (name) => {
    return /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === 'name') {
      setErrors((prev) => ({
        ...prev,
        name: validateName(value) ? '' : 'Name should only contain letters and single spaces between words'
      }))
    } else if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email format'
      }))
    } else if (name === 'mobile') {
      setErrors((prev) => ({
        ...prev,
        mobile: validateMobile(value) ? '' : 'Mobile number must be exactly 10 digits'
      }))
    }
  }

  const handleEditClick = () => {
    setShowConfirm(true)
  }

  const saveEdit = async () => {
    setShowConfirm(false)

    if (!formData.name || !validateName(formData.name) || !validateEmail(formData.email) || !validateMobile(formData.mobile)) {
      setErrors({
        name: !formData.name ? 'Name is required' : !validateName(formData.name) ? 'Name should only contain letters and single spaces between words' : '',
        email: validateEmail(formData.email) ? '' : 'Invalid email format',
        mobile: validateMobile(formData.mobile) ? '' : 'Mobile number must be exactly 10 digits'
      });
      return;
    }

    try {
      const response = await axiosInstance.put(`/admin/edit/${user._id}`, formData)
      onSave(response.data)
    } catch (error) {
      console.log('Error saving edited user:', error)
      toast.error('validation is not correct or email already existed')
    }
    update(prev => !prev)
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="edit-user-admin">
        
        <h3>Edit User</h3>
        <div className="form-group">
          <label htmlFor="name">
            <User size={18} />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <Mail size={18} />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">
            <Phone size={18} />
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleEditClick}>
            <Save size={18} />
            Save
          </button>
          <button className="cancel-button" onClick={onCancel}>
            <X size={18} />
            Cancel
          </button>
        </div>
        {showConfirm && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <p>Are you sure you want to save changes?</p>
              <button className="yes-button" onClick={saveEdit}>Yes</button>
              <button className="no-button" onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EditAndDelete
