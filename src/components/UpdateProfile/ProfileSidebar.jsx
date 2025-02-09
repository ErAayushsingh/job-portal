import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
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
        { name: 'Home', route: 'home' },
        { name: 'My Applications', route: 'applications' },
        { name: 'My Bookmarks', route: 'bookmarks' },
        { name: 'Edit Resume', route: 'edit-resume' },
        { name: 'Edit Preferences', route: 'edit-preferences' },
        { name: 'Safety Tips', route: 'safety-tips' },
        { name: 'Help Center', route: 'help-center' },
    ];

    return (
        <div className="profile-sidebar p-2" style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
            <h4 className="mb-4">{userName}</h4>
            <p className="text-muted mb-4">{userEmail}</p>
            <Nav variant="pills" className="flex-column">
                {menuItems.map((item, index) => (
                    <Nav.Link
                        as={NavLink}
                        to={`/update-profile/${item.route}`}
                        key={index}
                        className="text-dark"
                        style={{ cursor: 'pointer' }}
                    >
                        {item.name}
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
}

export default ProfileSidebar;
