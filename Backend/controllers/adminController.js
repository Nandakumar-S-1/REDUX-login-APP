const User = require("../models/userSchama");
const bcrypt = require("bcrypt");

const getHome = async (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to admin dashboard" });
  } catch (error) {
    res.status(500).send({ message: "Error occured accesing admin home" });
  }
};

const showUser = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    if (!users || users.length === 0) {
      res.status(404).json({ message: "User not found" });
    }
    return res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "user already exist witht this email, try a new email",
        });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({
      userName: name,
      email: email,
      phone: phone,
      password: hashedPass,
    });
    await newUser.save();
    res.status(200).json({ message: "User added succesfully" });
  } catch (error) {
    console.log(error, "add user ------------");

    res.status(500).json({ error: "Error adding new user" });
  }
};

const logOutLoad = async (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logout is success" });
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      userName: name,
      email: email,
      phone: phone,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User update is successfull" });
  } catch (error) {
    res.status(500).json({ error: "Error updating Use" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Error occured deleeting user", error });
  }
};

module.exports = {
  getHome,
  addUser,
  showUser,
  logOutLoad,
  editUser,
  deleteUser,
};
