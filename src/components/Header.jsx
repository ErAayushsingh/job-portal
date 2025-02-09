import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonAlert from '../components/Common/CommonAlert';

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
                setUser(null);  // Set to null in case of parsing errors
            }
        } else {
            setUser(null);
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            try {
                const url = apiEndpoints.jobs.searchJobs(searchQuery);
                const response = await apiService.get(url);
                onSearchResults(response);

                setAlert({
                    message: `Jobs found for "${searchQuery}"!`,
                    variant: 'success',
                });
                setSearchQuery('');  // Clear search box after successful search
            } catch (err) {
                setAlert({
                    message: 'Failed to fetch search results. Please try again.',
                    variant: 'danger',
                });
            }
        } else {
            setAlert({
                message: 'Please enter a search keyword.',
                variant: 'warning',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');

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
                    <Navbar.Brand href="/" className="fw-bold" style={{ color: '#007bff', fontSize: '24px' }}>
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
                                        onClick={() => navigate('/')}
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
