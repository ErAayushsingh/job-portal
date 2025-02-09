import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Filters from './Filters';
import JobList from './JobList';
import JobDetailsModal from './JobDetailsModal';
import Login from './Login';
import Register from './Register';
import AppWrapper from './AppWrapper';

function Routing() {
    return (
        <Router>
            {/* Header appears globally */}
            <Header onSearchResults={() => {}} />

            {/* Define all routes */}
            <Routes>
                {/* Home Route */}
                <Route 
                    path="/" 
                    element={
                         <div>
                            <h2 className="text-center mb-4 mt-3">Available Jobs</h2>
                            <div className="d-flex flex-column flex-md-row">
                                <div className="flex-grow-1 mb-3 mb-md-0">
                                    <Filters onFilter={() => {}} />
                                </div>
                                <div className="flex-grow-3">
                                    <JobList />
                                </div>
                            </div>
                            <JobDetailsModal job={null} show={false} onClose={() => {}} />
                         </div>
                    } 
                />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />
            </Routes>

            {/* Footer appears globally */}
            <Footer />
        </Router>
    );
}

export default Routing;
