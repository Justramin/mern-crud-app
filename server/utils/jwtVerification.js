import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ success: false, message: 'Access denied, token not found' });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ success: false, message: 'Invalid token' });
                return;
            } else {
                next();
            }
        })
    } catch (error) {
        console.error('Error in authMiddle:', error);
        res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    }
}

export default authMiddleware