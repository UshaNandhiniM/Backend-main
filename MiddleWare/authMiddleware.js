import jwt from 'jsonwebtoken'
import User from '../../Models/userSchema'
import dotenv from 'dotenv';

dotenv.config();

 const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {return res.status(401).send({ message: 'Access denied. Login Again.' });}
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded
        const user=await User.findById(req.user.id);
        
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
    }
    export default authenticateToken; 