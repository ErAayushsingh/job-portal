import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';

function JobCard({ job, onClick }) {
    return (
        <Col md={6} className="mb-4">
            <Card 
                className="shadow-sm border-0" 
                onClick={() => onClick(job)} 
                style={{ cursor: 'pointer', borderRadius: '10px' }}
            >
                <Card.Body>
                    <Card.Title className="text-primary">{job.postName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                    
                    {/* ✅ Replace <p> with <div> inside <CardText> */}
                    <Card.Text>
                        <div><strong>Location:</strong> {job.workLocation}</div>
                        <div><strong>Experience:</strong> {job.jobExperience} years</div>
                        <div><strong>Qualifications:</strong> {job.jobQualifications}</div>
                        <div className="text-truncate" style={{ maxWidth: '300px' }}>
                            <strong>Description:</strong> {job.jobDescription}
                        </div>
                    </Card.Text>

                    <Button variant="outline-primary" onClick={() => onClick(job)}>
                        View Details
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default JobCard;
