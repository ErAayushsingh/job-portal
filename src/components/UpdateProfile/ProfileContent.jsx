import React from 'react';
import { Tab, Container } from 'react-bootstrap';
import Home from './Pages/Home';
import Applications from './Pages/Applications';
import Bookmarks from './Pages/Bookmarks';
import EditResume from './Pages/EditResume';
import EditPreferences from './Pages/EditPreferences';

function ProfileContent({ activeKey }) {
    return (
        <Tab.Content className="p-4" style={{ height: '100vh', overflowY: 'auto' }}>
            <Tab.Pane eventKey="home">
                <Home />
            </Tab.Pane>
            <Tab.Pane eventKey="applications">
                <Applications />
            </Tab.Pane>
            <Tab.Pane eventKey="bookmarks">
                <Bookmarks />
            </Tab.Pane>
            <Tab.Pane eventKey="edit-resume">
                <EditResume />
            </Tab.Pane>
            <Tab.Pane eventKey="edit-preferences">
                <EditPreferences />
            </Tab.Pane>
            {/* Add additional tabs as needed */}
        </Tab.Content>
    );
}

export default ProfileContent;
