const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchama");


const adminAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin || !admin.isAdmin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });
    // console.log('token=======',token);
    
    res.json({admin})
  } catch (error) {
    return res.status(500).json({message:'server error '})
  }
};

const adminVerification = async(req,res,next)=>{
    const token = req.cookies.adminToken

    if(!token){
        return res.status(401).json({message:'No token provided . Access denied'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const admin = await User.findById(decoded.adminId)

        if(!admin || !admin.isAdmin){
            return res.status(403).json({message:'Access denied: Admins Only'})
        }
        req.admin=admin
        next()

    } catch (error) {
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports={
    adminAuth,
    adminVerification
}