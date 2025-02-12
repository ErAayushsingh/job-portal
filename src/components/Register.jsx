import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonAlert from './Common/CommonAlert';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);  
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const payload = { name, username: email, password, role };
            await apiService.post(apiEndpoints.auth.register, payload);

            const userData = { name, role };
            localStorage.setItem('user', JSON.stringify(userData));

            // ✅ Display success message
            setSuccess(`Registration successful! Welcome, ${name}`);

            // ✅ Redirect based on role after 2 seconds
            setTimeout(() => {
                if (role === 'ADMIN') {
                    navigate('/create-post');
                } else {
                    navigate('/job-list');
                }
            }, 2000);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <>
            {error && <CommonAlert message={error} variant="danger" />}
            {success && <CommonAlert message={success} variant="success" />}
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Register at JobPortal</h2>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="role" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="USER">Job Seeker</option>
                                <option value="ADMIN">Job Provider</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Register
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Register;
