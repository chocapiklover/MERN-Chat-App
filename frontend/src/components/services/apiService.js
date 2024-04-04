

export const addUserToContacts = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to add to contacts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding contact:', error);
        throw error; // Rethrow to handle in UI layer
    }
};