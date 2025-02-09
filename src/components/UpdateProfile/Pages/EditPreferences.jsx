import React from 'react';
import { Form, Button } from 'react-bootstrap';

function EditPreferences() {
    return (
        <div>
            <h2>Edit Preferences</h2>
            <Form>
                <Form.Group controlId="jobType" className="mb-3">
                    <Form.Label>Preferred Job Type</Form.Label>
                    <Form.Control as="select">
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Freelance</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="locationPreference" className="mb-3">
                    <Form.Label>Preferred Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter preferred location" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Preferences
                </Button>
            </Form>
        </div>
    );
}

export default EditPreferences;
