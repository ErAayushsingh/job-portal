import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import {apiService} from './ApiService';  
import apiEndpoints from './apiendpoint'; 

function Filters({ onFilter }) {
    const [jobPost, setJobPost] = useState('');
    const [location, setLocation] = useState('');
    const [skill, setSkill] = useState('');

    const handleFilterSubmit = async (e) => {
        e.preventDefault();

        const payload = {};

        if (jobPost.trim()) {
            payload.jobPost = jobPost.trim();
        }
        if (location.trim()) {
            payload.location = location.trim();
        }
        if (skill.trim()) {
            payload.skill = skill.trim();
        }

        try {
            const response = await apiService.post(apiEndpoints.jobs.filterJobs, payload);
            onFilter(response.data);  
        } catch (error) {
            console.error('Error fetching filtered jobs:', error);
        }
    };

    return (
        <Card className="p-3 mb-4">
            <h5>Filters</h5>
            <Form onSubmit={handleFilterSubmit}>
                <Form.Group controlId="jobPostFilter" className="mb-3">
                    <Form.Label>Job Post</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., Developer, Designer"
                        value={jobPost}
                        onChange={(e) => setJobPost(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="locationFilter" className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., New Delhi, Remote"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="skillFilter" className="mb-3">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g., React, Marketing"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Apply Filters</Button>
            </Form>
        </Card>
    );
}

export default Filters;
