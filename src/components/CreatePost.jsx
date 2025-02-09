import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import apiService from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonAlert from './Common/CommonAlert';

function CreatePost() {
    const [postName, setPostName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState(null);

    const handlePostCreation = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const payload = { postName, companyName, jobDescription: description, workLocation: location };
            await apiService.post(apiEndpoints.jobs.createPost, payload);
            setMessage('Job posting created successfully!');
        } catch (err) {
            setMessage('Failed to create job post. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Create Job Post</h2>
                {message && <p className={`text-${message.includes('success') ? 'success' : 'danger'} text-center`}>{message}</p>}
                <Form onSubmit={handlePostCreation}>
                    <Form.Group controlId="postName" className="mb-3">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter job title"
                            value={postName}
                            onChange={(e) => setPostName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="companyName" className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter job description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="location" className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter job location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                        Create Post
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default CreatePost;
