import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import Login from './Login'; 
import Register from './Register'; 

export default function AppWrapper() {
    return (
        <Router>
            <Header onSearchResults={() => {}} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Add other routes here if needed */}
            </Routes>
        </Router>
    );
}
