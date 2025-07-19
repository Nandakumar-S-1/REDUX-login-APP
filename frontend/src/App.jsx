import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProtect, UserLoginProtect } from "./secure/UserProtect";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Home from "./pages/userHome/Home";
import UserProfile from "./components/userProfile/UserProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import AdminHome from "./pages/admin/adminHome/AdminHome";
import Dashboard from "./pages/admin/adminDash/Dashboard";
import AddUser from "./pages/admin/adminADD/AddUser";
import { AdminProtect, AdminLoginProtect } from "./secure/AdminProtect";
import NotFoundError from "./pages/Error/ErrorNotfound";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* user routess  */}
        <Route
          path="/signup"
          element={
            <UserLoginProtect>
              <SignUp />
            </UserLoginProtect>
          }
        />
        <Route
          path="/"
          element={
            <UserLoginProtect>
              <Login />
            </UserLoginProtect>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtect>
              <Home/>
            </UserProtect>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtect>
              <UserProfile />
            </UserProtect>
          }
        />
        <Route
          path="/edit"
          element={
            <UserProtect>
              <EditProfile />
            </UserProtect>
          }
        />

        {/* admin routes  */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginProtect>
              <AdminLogin />
            </AdminLoginProtect>
          }
        />
        <Route
          path="/admin/home"
          element={
            <AdminProtect>
              <AdminHome />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtect>
              <Dashboard />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/adduser"
          element={
            <AdminProtect>
              <AddUser />
            </AdminProtect>
          }
        />
        {/* error  */}
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </Router>
  );
};

export default App;
