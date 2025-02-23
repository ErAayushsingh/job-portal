import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Divider, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function ProfileSidebar() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Fetch user details from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // setUserName(parsedUser.name);
            // setUserEmail(parsedUser.username);  // Assuming username is the email
        }
    }, []);

    const menuItems = [
        { name: 'Profile', route: 'home' },
        { name: 'My Applications', route: 'applications' },
        { name: 'My Bookmarks', route: 'bookmarks' },
        { name: 'Edit Resume', route: 'edit-resume' },
        { name: 'Edit Preferences', route: 'edit-preferences' },
        { name: 'Safety Tips', route: 'safety-tips' },
        { name: 'Help Center', route: 'help-center' },
    ];

    return (
        <Box sx={{ p: 0, borderRight: '1px solid #ccc', height: '100vh' }}>
            <Typography variant="h6" gutterBottom>
                {userName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {userEmail}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component={NavLink} to={`/update-profile/${item.route}`}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ProfileSidebar;
