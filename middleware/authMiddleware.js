const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { id: decodedToken.id, phone_number: decodedToken.phone_number };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = {
    authenticateToken
};
