import express from 'express';
import protectRoute from '../middleware/protectedRoute.js';
import { getUsersForSideBar, addUsersToContacts, searchUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSideBar);


//search for users in the sidebar
router.get('/search', protectRoute, searchUsers);

//route for adding a user to contacts, protected by authentication
//MAKE SURE FRONTEND CONSTRUCTS URL CORRECTLY
router.post('/:userId/contacts', protectRoute, addUsersToContacts);


export default router