import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateEmail =(email)=>{
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }
    const validatePass =(password)=>{
        return password.length >=6
    }
    useEffect(()=>{
        if(email && !validateEmail(email)){
        
        }
    })

    return (
    <div>
      
    </div>
  )
}

export default AdminLogin

