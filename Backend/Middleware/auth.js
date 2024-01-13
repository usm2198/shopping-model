const jwt = require('jsonwebtoken');

exports.auth = async(req, res, next) => {
    try {
        const token = req.header('Auth'); //can use like this also headers['AUth']
        if (!token) return res.json({ errors: true, message: "User not exist or token not exist" });
        const verifyToken = await jwt.verify(token, process.env.SEC);

        if (!verifyToken) return res.json({ errors: true, message: "Invalid token" });
        next();
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}
