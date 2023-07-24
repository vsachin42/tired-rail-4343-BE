const express = require('express');
const adminModel = require('../Model/admin.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminRouter = express.Router();

adminRouter.post('/register', async (req, res) => {
  try {
    const {email, password } = req.body;
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }
    bcrypt.hash(password, 5, async(err, hash) => {
        if(err){
            res.status(400).json({error:err})
        }else{
            const admin = new adminModel({email, password:hash});
            await admin.save();
            res.status(200).json({msg: "User has been registered", admin: req.body})
        }
      })
  } catch (error) {
    res.status(500).json({ error });
  }
});

adminRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email});

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, admin.password, (err, decode) => {
        if(decode){
            const token = jwt.sign({adminId: admin._id}, process.env.secretKey)
            res.status(200).json({msg: "Logged In!!", token});
        }else{
            res.status(400).json({error:err});
        }
    })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = {
    adminRouter
};
