import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../UpdateProfile/Pages/Home';
import Applications from '../UpdateProfile/Pages/Applications';
import Bookmarks from '../UpdateProfile/Pages/Bookmarks';
import EditResume from '../UpdateProfile/Pages/EditResume';
import EditPreferences from '../UpdateProfile/Pages/EditPreferences';

function ProfileRoutes() {
    return (
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="applications" element={<Applications />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="edit-resume" element={<EditResume />} />
            <Route path="edit-preferences" element={<EditPreferences />} />
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default ProfileRoutes;
