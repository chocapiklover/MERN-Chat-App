//package imports */
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//file imports
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './DB/connectToMongoDB.js';
import userRoutes from './routes/user.routes.js';

//variables
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//middleware
app.use(express.json()); // to parse the incoming request with JSON payload from req.body
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);



// app.get('/', (req, res) => {
//     //root route http://localhost:5000/
//     res.send("hello world!!");
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});