import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Filters from './Filters';
import JobList from './JobList';
import JobDetailsModal from './JobDetailsModal';
import Login from './Login';
import Register from './Register';
import CreatePost from './CreatePost';

function Routing() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowDetails = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Router>
            {/* Global Header */}
            <Header onSearchResults={() => {}} />

            <Routes>
                {/* Redirect Home Route to /job-list */}
                <Route path="/" element={<Navigate to="/job-list" />} />

                {/* Job List Page */}
                <Route 
                    path="/job-list" 
                    element={
                        <div>
                            <h2 className="text-center mb-4 mt-3">Available Jobs</h2>
                            <div className="d-flex flex-column flex-md-row">
                                <div className="flex-grow-1 mb-3 mb-md-0">
                                    <Filters onFilter={() => {}} />
                                </div>
                                <div className="flex-grow-3">
                                    <JobList onJobClick={handleShowDetails} />
                                </div>
                            </div>
                            <JobDetailsModal job={selectedJob} show={showModal} onClose={handleCloseModal} />
                        </div>
                    } 
                />

                {/* Create Post Page (For Admins) */}
                <Route path="/create-post" element={<CreatePost />} />

                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Register Page */}
                <Route path="/register" element={<Register />} />

                {/* Redirect any unknown routes to /job-list */}
                <Route path="*" element={<Navigate to="/job-list" />} />
            </Routes>

            {/* Global Footer */}
            <Footer />
        </Router>
    );
}

export default Routing;
