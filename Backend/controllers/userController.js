const User = require("../models/userSchama");

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const updateProfile = async (req, res) => {
  console.log('updateProfile controller reached 1');

  try {
    const { userName, email, phone } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log('current user-----', user);

    const updatedProfileData = {
      userName: userName || user.userName,
      email: email || user.email,
      phone: phone || user.phone,
    };

    if (req.file) {
      updatedProfileData.profilePicture = "/uploads/" + req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedProfileData,
      { new: true }
    );

    console.log('Updated Data:', updatedProfileData, 'Updated User:', updatedUser);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logOut = (req, res) => {
  res.clearCookie("userToken");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  updateProfile,
  userProfile,
  logOut,
};
