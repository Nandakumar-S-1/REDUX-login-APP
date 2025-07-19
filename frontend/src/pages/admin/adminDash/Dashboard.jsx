import React, { useEffect, useState } from 
'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import { toast } from 'sonner'

const Dashboard = () => {
    const [users,setUsers]=useState([])
    const [editUser,setEditUser]=useState(null)
    const [filteredUsers,setFilteredUsers]=useState([])
    const [message,setMessage]=useState('')
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [update, setUpdate] = useState(false);

    const navigate = useNavigate()
    const isLoggedIn = useSelector((state)=>state.admin.AdminLoggedIn)
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchUsers =async () => {
            try {
                const response = await axiosInstance.get('/admin/dashboard')
                setUsers(response.data)
                setFilteredUsers(response.data)
            } catch (error) {
                console.error('Error while fetching users',error);
                toast.error('failed to fetch users')
            }
        }
        fetchUsers()
    },[update])

    useEffect(()=>{
        if(searchTerm.trim()===''){
            setFilteredUsers(users)
        }else{
            const filtered = users.filter((user)=>{
                user.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            setFilteredUsers(filtered)
            if(filtered.length===0&& searchTerm.trim() !==''){
                toast.info('no users found mathing your search term')
            }
        }
    },[searchTerm,users])

    const handleSearch=(e)=>{
        setSearchTerm(e.target.value)
    }

    const handleEdit = (userId)=>{
        const userToEdit = users.find((user)=>user._id===userId)
        setEditUser(userToEdit)
        toast.info('Editing user details')
    }
    
    const handleSave =(updatedUser)=>{
        setUsers((prevUsers)=>{
            prevUsers.map((user)=>(user._id===updatedUser._id ? updatedUser:user))
        })
        setEditUser(null)
        toast.success('User updated successfully')
    }
    const handleCancell =()=>{
        setEditUser(null)
        toast.info('edit cancelled')
    }

    const handleDelete = async (userId) => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
    <div>
      
    </div>
  )
}

export default Dashboard
