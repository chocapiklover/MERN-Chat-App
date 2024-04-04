//package imports */
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

//file imports
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './DB/connectToMongoDB.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

//variables
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

//middleware
app.use(express.json()); // to parse the incoming request with JSON payload from req.body
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

 
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});