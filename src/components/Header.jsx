import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {apiService} from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonAlert from './Common/CommonAlert';

function Header({ onSearchResults }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [alert, setAlert] = useState({ message: null, variant: 'danger' });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Failed to parse user data:', err);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const url = searchQuery.trim() 
                ? apiEndpoints.jobs.searchJobs(searchQuery) 
                : apiEndpoints.jobs.getAllJobs; // If search query is empty, fetch all jobs
    
            const response = await apiService.get(url);
            onSearchResults(response);
    
            setAlert({
                message: searchQuery.trim() 
                    ? `Jobs found for "${searchQuery}"!` 
                    : 'Showing all jobs.',
                variant: 'success',
            });
    
            setSearchQuery('');
        } catch (err) {
            setAlert({
                message: 'Failed to fetch search results. Please try again.',
                variant: 'danger',
            });
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');

        setAlert({
            message: 'Logged out successfully.',
            variant: 'success',
        });
    };

    const handleProfileUpdate = () => {
        navigate('/update-profile');
    };

    return (
        <>
            {alert.message && <CommonAlert message={alert.message} variant={alert.variant} />}
            <Navbar bg="white" expand="lg" className="shadow-sm p-3 sticky-top">
                <Container>
                    <Navbar.Brand
                        href="/"
                        className="fw-bold"
                        style={{ color: '#007bff', fontSize: '24px' }}
                    >
                        JobPortal
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                            {/* Search Form */}
                            <Form className="d-flex me-3 flex-grow-1" onSubmit={handleSearch} style={{ maxWidth: '600px' }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search for jobs, internships..."
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-primary" type="submit">Search</Button>
                            </Form>

                            {/* Navigation Links */}
                            <Nav className="align-items-center">
                                {user?.role === 'ADMIN' && (
                                    <Nav.Link
                                        className="text-primary fw-bold me-3"
                                        onClick={() => navigate('/create-post')}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        Create Post
                                    </Nav.Link>
                                )}
                                {user?.role === 'USER' && (
                                    <Nav.Link
                                        className="fw-bold me-3"
                                        onClick={() => navigate('/job-list')}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        Jobs
                                    </Nav.Link>
                                )}

                                {/* User Info or Login/Registration */}
                                {user ? (
                                    <NavDropdown title={user.name} id="user-dropdown">
                                        <NavDropdown.Item onClick={handleProfileUpdate}>
                                            Update Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavDropdown title="Login / Register" id="login-dropdown">
                                        <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/register')}>Register</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
