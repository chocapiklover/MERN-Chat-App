import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { request, response } from 'express';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(401).json({ error: 'unauthorized, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //decode the token with the secret 

        if (!decoded) {
            res.status(401).json({ error: 'unauthorized, invalid token' });
        }

        const user = await User.findById(decoded.userId).select("-password") //user in the database

        if (!user) {
            return response.status(401).json({ error: 'User not found' });
        }

        req.user = user; //attached the user object to the request

        next(); // will call the next function 'sendMessage' 
        } catch (error) {
        console.error("error in protectRoute middleware", error.message);
        res.status(500).json({ error: "internal server error"});
    }
};

export default protectRoute;