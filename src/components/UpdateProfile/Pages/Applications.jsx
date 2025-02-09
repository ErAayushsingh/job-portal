import React from 'react';
import { Card } from 'react-bootstrap';

function Applications() {
    const applications = [
        { id: 1, jobTitle: 'Frontend Developer', company: 'Google' },
        { id: 2, jobTitle: 'Backend Developer', company: 'Facebook' },
        { id: 3, jobTitle: 'Full Stack Developer', company: 'Microsoft' },
    ];

    return (
        <div>
            <h2>My Applications</h2>
            {applications.map((application) => (
                <Card key={application.id} className="mb-3">
                    <Card.Body>
                        <h5>{application.jobTitle}</h5>
                        <p>Company: {application.company}</p>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Applications;
