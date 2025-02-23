// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// function JobDetailsModal({ job, show, onClose }) {
//     if (!job) return null;

//     return (
//         <Modal show={show} onHide={onClose} centered size="lg">
//             <Modal.Header closeButton>
//                 <Modal.Title>{job.postName}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div>
//                     <h5 className="mb-3">Company: <span className="text-primary">{job.companyName}</span></h5>
//                     <p><strong>Location:</strong> {job.workLocation}</p>
//                     <p><strong>Experience:</strong> {job.jobExperience} years</p>
//                     <p><strong>Qualifications:</strong> {job.jobQualifications}</p>
//                     <p><strong>Job Responsibilities:</strong></p>
//                     <p>{job.jobResponsibilities || 'Not specified'}</p>
//                     <p><strong>Description:</strong></p>
//                     <p>{job.jobDescription || 'Not specified'}</p>

//                     {job.skills.length > 0 && (
//                         <>
//                             <p><strong>Skills:</strong></p>
//                             <ul>
//                                 {job.skills.map((skill, index) => (
//                                     <li key={index}>{skill}</li>
//                                 ))}
//                             </ul>
//                         </>
//                     )}

//                     <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
//                         Apply Now
//                     </a>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default JobDetailsModal;

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function JobDetailsModal({ job, show, onClose }) {
    if (!job) return null;

    return (
        <Modal open={show} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: { xs: '90%', sm: 600 }
            }}>
                <Typography variant="h5" color="primary">{job.postName}</Typography>
                <Typography variant="subtitle1">{job.companyName}</Typography>
                <Typography variant="body2" mt={2}><strong>Location:</strong> {job.workLocation}</Typography>
                <Typography variant="body2"><strong>Experience:</strong> {job.jobExperience} years</Typography>
                <Typography variant="body2"><strong>Qualifications:</strong> {job.jobQualifications}</Typography>
                <Typography variant="body2" mt={2}><strong>Job Responsibilities:</strong> {job.jobResponsibilities || 'Not specified'}</Typography>
                <Typography variant="body2" mt={2}><strong>Description:</strong> {job.jobDescription || 'Not specified'}</Typography>

                {job.skills.length > 0 && (
                    <>
                        <Typography variant="body2" mt={2}><strong>Skills:</strong></Typography>
                        <ul>
                            {job.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </>
                )}

                <Box mt={3} textAlign="center">
                    <Button variant="contained" color="primary" href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply Now
                    </Button>
                </Box>

                <Box textAlign="right" mt={3}>
                    <Button variant="contained" color="secondary" onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default JobDetailsModal;
