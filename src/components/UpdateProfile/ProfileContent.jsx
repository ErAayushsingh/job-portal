import React, { useState } from 'react';
import { Container, Box, Tabs, Tab, Paper } from '@mui/material';
import Home from './Pages/Home';
import Applications from './Pages/Applications';
import Bookmarks from './Pages/Bookmarks';
import EditResume from './Pages/EditResume';
import EditPreferences from './Pages/EditPreferences';

function ProfileContent() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Container >
            <Paper elevation={3} sx={{  borderRadius: '10px', overflow: 'hidden' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Home" value="home" />
                    <Tab label="Applications" value="applications" />
                    <Tab label="Bookmarks" value="bookmarks" />
                    <Tab label="Edit Resume" value="edit-resume" />
                    <Tab label="Edit Preferences" value="edit-preferences" />
                </Tabs>
            </Paper>

            <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', padding: 2 }}>
                {activeTab === 'home' && <Home />}
                {activeTab === 'applications' && <Applications />}
                {activeTab === 'bookmarks' && <Bookmarks />}
                {activeTab === 'edit-resume' && <EditResume />}
                {activeTab === 'edit-preferences' && <EditPreferences />}
            </Box>
        </Container>
    );
}

export default ProfileContent;
