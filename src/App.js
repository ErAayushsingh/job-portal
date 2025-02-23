import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Filters from './components/Filters';
import JobList from './components/JobList';
import JobDetailsModal from './components/JobDetailsModal';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import ProfileSidebar from './components/UpdateProfile/ProfileSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/UpdateProfile/Pages/Home';
import Applications from './components/UpdateProfile/Pages/Applications';
import Bookmarks from './components/UpdateProfile/Pages/Bookmarks';
import EditResume from './components/UpdateProfile/Pages/EditResume';
import EditPreferences from './components/UpdateProfile/Pages/EditPreferences';
import SafetyTips from './components/UpdateProfile/Pages/SafetyTips';
import HelpCenter from './components/UpdateProfile/Pages/HelpCenter';
import './App.css';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserRole(parsedUser.role);
        }
    }, []);

    const handleShowDetails = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={
                    userRole === 'ADMIN' ? <Navigate to="/create-post" /> :
                    userRole === 'USER' ? <Navigate to="/job-list" /> :
                    <Navigate to="/login" />
                } />

                <Route path="/job-list" element={
                    userRole === 'USER' ? (
                        <Container fluid className="mt-4">
                            <Row>
                                {/* <Col md={3} className="sticky-filters">
                                    <Filters />
                                </Col> */}
                                <Col md={12} className="scrollable-content">
                                    <JobList onJobClick={handleShowDetails} />
                                </Col>
                            </Row>
                            <JobDetailsModal job={selectedJob} show={showModal} onClose={handleCloseModal} />
                        </Container>
                    ) : <Navigate to="/" />
                } />

                <Route path="/create-post" element={
                    userRole === 'ADMIN' ? <CreatePost /> : <Navigate to="/" />
                } />

                <Route path="/update-profile/*" element={
                    userRole ? (
                        <Container fluid className="d-flex" style={{ height: '100vh' }}>
                            <Col md={3} className="p-0" style={{ borderRight: '1px solid #ddd' }}>
                                <ProfileSidebar />
                            </Col>
                            <Col md={9} className="p-4" style={{ overflowY: 'auto' }}>
                                <Routes>
                                    <Route path="home" element={<Home />} />
                                    <Route path="applications" element={<Applications />} />
                                    <Route path="bookmarks" element={<Bookmarks />} />
                                    <Route path="edit-resume" element={<EditResume />} />
                                    <Route path="edit-preferences" element={<EditPreferences />} />
                                    <Route path="safety-tips" element={<SafetyTips />} />
                                    <Route path="help-center" element={<HelpCenter />} />
                                    <Route path="*" element={<Navigate to="home" />} />
                                </Routes>
                            </Col>
                        </Container>
                    ) : <Navigate to="/login" />
                } />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/job-list" />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
