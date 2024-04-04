import User from "../models/user.model.js";

//Function to get users for the sidebar
//CHANGE TO ONLY SHOW USERS FROM CONTACTS
export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // From the middleware

        // Retrieve the logged-in user with their contacts populated
        const loggedInUserWithContacts = await User.findById(loggedInUserId)
            .select('contacts') // Select only the contacts field (and implicitly _id)
            .populate('contacts', '-password'); // Populate the contacts field, excluding passwords

        // Since the contacts are already populated, we can directly send them back
        // If loggedInUserWithContacts is null or the contacts field isn't populated for some reason, return an empty array
        const contacts = loggedInUserWithContacts ? loggedInUserWithContacts.contacts : [];

        res.status(200).json(contacts);

    } catch (error) {
        console.log('Error in getUsersForSideBar controller:', error.message);
        res.status(500).json({error: 'Internal server error'});
    }
};

//Function to add users to contacts list

export const addUsersToContacts = async (req, res) => {

    try {
        const { userId } = req.params; //ID of the user to add to contacts
        const loggedInUserId = req.user._id //from the middleware

        if (userId === loggedInUserId) {
            return res.status(400).json({message: 'cannot add yourself to contacts'});
        }

        //add the user to contact 
        await User.findByIdAndUpdate(loggedInUserId, {
            $addToSet: { contacts: userId }
        });

        res.status(200).json({message: 'contact added successfully'});
        
    } catch (error) {
        console.log('error in addUsersToContacts controller:', error.message);
        res.status(500).json({error: 'Internal server error'});
    }
}

//Search for users 

export const searchUsers = async (req, res) => {
    try {
        const searchTerm = req.query.username;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const users = await User.find({
            username: { $regex: searchTerm, $options: 'i' },
            _id: { $ne: req.user._id } // Exclude the current user from search results
        }).select('-password'); // Exclude the password field

        res.json(users);
    } catch (error) {
        console.error('Error searching for users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};