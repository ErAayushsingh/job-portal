import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function JobDetailsModal({ job, show, onClose }) {
    if (!job) return null;

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{job.postName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5 className="mb-3">Company: <span className="text-primary">{job.companyName}</span></h5>
                    <p><strong>Location:</strong> {job.workLocation}</p>
                    <p><strong>Experience:</strong> {job.jobExperience} years</p>
                    <p><strong>Qualifications:</strong> {job.jobQualifications}</p>
                    <p><strong>Job Responsibilities:</strong></p>
                    <p>{job.jobResponsibilities || 'Not specified'}</p>
                    <p><strong>Description:</strong></p>
                    <p>{job.jobDescription || 'Not specified'}</p>

                    {job.skills.length > 0 && (
                        <>
                            <p><strong>Skills:</strong></p>
                            <ul>
                                {job.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
                        Apply Now
                    </a>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default JobDetailsModal;
