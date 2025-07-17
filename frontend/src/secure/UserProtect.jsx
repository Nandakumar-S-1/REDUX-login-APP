import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const UserProtect = ({children})=>{
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const isAdminLoggedIn =useSelector((state)=>state.admin.AdminLoggedIn)

    if(!isLoggedIn && !isAdminLoggedIn){
        return <Navigate to='/' replace/>
    }
    return children
}

export const UserLoginProtect = ({children})=>{
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const isAdminLoggedIn = useSelector((state)=>state.admin.AdminLoggedIn)
    if(isLoggedIn){
        return <Navigate to='/home' replace/>
    }
    if(isAdminLoggedIn){
        return <Navigate to='/admin/home' replace/>
    }
    return children
}