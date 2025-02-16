import React, { useEffect, useState } from 'react';
import { Row, Spinner, Alert, Pagination } from 'react-bootstrap';
import JobCard from './JobCard';
import JobDetailsModal from './JobDetailsModal';
import {apiService} from './ApiService';
import apiEndpoints from './apiendpoint';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const jobsPerPage = 5;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await apiService.get(apiEndpoints.jobs.getAllJobs);
                setJobs(response);
            } catch (err) {
                setError('Failed to fetch jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    if (loading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <Row>
                {currentJobs.map((job) => (
                    <JobCard key={job.id} job={job} onClick={handleJobClick} />
                ))}
            </Row>

            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Pagination.Item 
                        key={pageNumber} 
                        active={pageNumber === currentPage} 
                        onClick={() => setCurrentPage(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>

            {/* Job Details Modal */}
            <JobDetailsModal job={selectedJob} show={showModal} onClose={handleCloseModal} />
        </div>
    );
}

export default JobList;
