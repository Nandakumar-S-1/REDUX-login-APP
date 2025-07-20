import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import {login} from '../../redux/slice/UserSlice'
import { toast, Toaster } from 'sonner'
import '../../assets/styles/Login.css'

const Login = () => {
    const [formData,setformData]=useState({
        email:'',
        password:''
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setformData({...formData,[e.target.name]:e.target.value})
        if(e.target.name==='email') setError(prev => ({...prev, email: ''}))
        if(e.target.name==='password') setError(prev => ({...prev, password: ''}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formValid = true
        let newErrors = {email: '', password: ''}

        if(!formData.email){
            newErrors.email = 'Email is required'
            formValid=false
        }
                
        if(!formData.password){
            newErrors.password = 'Password is required'
            formValid=false
        }

        setError(newErrors)
        if(!formValid)return

        try {
            const response = await axiosInstance.post('/auth/login',formData)
            const user = response.data.user
            dispatch(login({user}))
            toast.success('Login Successful')
            navigate('/home')
        } catch (error) {
            if(error.response?.status ===403){
                toast.error('Admins cannot login as users')
            }else if(error.response ?.status ===400){
                toast.error(error.response?.data ?.message || 'Login Failed')
            }else{
                toast.error('An unexpected error occurred')
            }
        }
    }

    return (
    <>
        <Toaster position='top-right' richColors/>
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${error.password ? "input-error" : ""}`}
                        />
                        {error.password && <p className="error-message">{error.password}</p>}
                    </div>

                    <button type="submit" className="submit-btn">
                        Sign in
                    </button>
                </form>

                <a className="signup-link" href="/signup">
                    Signup?
                </a>
            </div>
        </div>
    </>
  )
}

export default Login
