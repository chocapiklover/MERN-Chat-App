import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectedRoute.js'


const router = express.Router();

router.get("/:id" ,protectRoute ,getMessages); //user who sent the message
router.post("/send/:id" ,protectRoute ,sendMessage); //user who sent the message

export default router;