import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast, Toaster } from "sonner";
import { logout } from "../../../redux/slice/UserSlice";
import "../../../assets/styles/AdminDashboard.css";
import EditAndDelete from "../editAndDelete/EditAndDelete";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/dashboard");
        console.log("Fetched Users:", response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error while fetching users", error);
        toast.error("failed to fetch users");
      }
    };
    fetchUsers();
  }, [update]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      if (filtered.length === 0 && searchTerm.trim() !== "") {
        toast.info("no users found mathing your search term");
      }
    }
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditUser(userToEdit);
    toast.info("Editing user details");
  };

  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setEditUser(null);
    toast.success("User updated successfully");
  };

  const handleCancel = () => {
    setEditUser(null);
    toast.info("edit cancelled");
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/deleteUser/${userId}/`
      );
      console.log("res", response);

      toast.success("user deleted succesfully");
      setUsers((p) => p.filter((user) => user._id !== userId));
      setFilteredUsers((p) => p.filter((user) => user._id !== userId));
      dispatch(logout());
      setConfirmDelete(null);
    } catch (error) {
      console.log("theres an error deleting user", error);
      toast.error("Failed to delete the user");
      setConfirmDelete(null);
    }
  };

  if (isLoggedIn === false) {
    navigate("/admin/login");
  }

  return (
    <>
      <Toaster
        richColors
        position="top-right"
        expand={true}
        duration={4000}
        closeButton
      />
      <main className="dashboard-wrapper">
        <div className="dashboard-container">
          {!editUser && <h2>Admin Dashboard</h2>}
          {!editUser && (
            <div className="dashboard-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/home")}
              >
                Back To Home
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/admin/addUser")}
              >
                Add User +
              </button>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search users by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <button className="btn btn-search">Search</button>
              </div>
            </div>
          )}

          {message && <h3 className="success-message">{message}</h3>}

          {editUser ? (
            <div className="edit-page-wrapper">
              <EditAndDelete
                user={editUser}
                onSave={handleSave}
                onCancel={handleCancel}
                update={setUpdate}
              />
            </div>
          ) : (
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <img
                          src={
                            user?.profileImage
                              ? `${import.meta.env.VITE_BASE_IMG_URL}/${user.profileImage}`
                              : "/src/assets/dummy.jpg"
                          }
                          alt={user.username}
                          className="user-image"
                        />
                      </td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => setConfirmDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Confirmation Modal */}
          {confirmDelete && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Are you sure you want to delete this user?</h3>
                <div className="modal-buttons">
                  <button
                    className="btn btn-confirm"
                    onClick={() => handleDelete(confirmDelete)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => setConfirmDelete(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
