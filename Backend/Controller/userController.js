const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post Register
exports.registerUser = async(req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.json({ errors: true, message: "User already exist" })

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const data = await User.create(req.body);
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}

// Login 
exports.login = async(req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) return res.status(400).json({ errors: true, message: "Invalid Username and Password" });

        const verifyPassword = await bcrypt.compare(req.body.password, userExists.password);
        if (!verifyPassword) res.status(400).json({ errors: true, message: "Invalid Username and Password" });

        const token = await jwt.sign({ _id: userExists._id }, process.env.SEC);
        return res.json({ errors: false, data: { token: token, user: userExists } })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// Get User
exports.getUser = async(req, res) => {
    try {
        const data = await User.find();
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}