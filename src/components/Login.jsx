import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonAlert from './Common/CommonAlert';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);  // Clear any previous errors

        try {
            const response = await apiService.post(apiEndpoints.auth.login, {
                username: email,
                password: password,
            });

            if (response && response.jwtToken) {
                // Store user data and token
                const userData = {
                    name: response.name,
                    role: response.userRole,
                    jwtToken: response.jwtToken,
                    username: response.username,
                };

                localStorage.setItem('user', JSON.stringify(userData));

                // Show success alert
                setSuccess('Login successful! Welcome, ' + response.name);
                
                // Redirect to homepage after 2 seconds
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError('Invalid login response.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <>
            {error && <CommonAlert message={error} variant="danger" />}
            {success && <CommonAlert message={success} variant="success" />}
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Login to JobPortal</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
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
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Login
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Login;
