import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Pagination, Box, Container, TextField, FormControl, InputLabel, Select, MenuItem, Breadcrumbs, Typography, Link, IconButton, InputAdornment, Card, CardContent, CardActions, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClearIcon from '@mui/icons-material/Clear';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import JobDetailsModal from './JobDetailsModal';
import { apiService } from './ApiService';
import apiEndpoints from './apiendpoint';
import CommonSnackbar from './CommonSnackbar';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ jobType: '', experience: '' });
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const jobsPerPage = 9; // ✅ Now showing 9 jobs per page

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchJobs(searchQuery);
        }, 500); // ⏳ Debounced auto-search (500ms delay)

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async (query = '') => {
        setLoading(true);
        try {
            const response = query
                ? await apiService.get(apiEndpoints.jobs.searchJobs(query))
                : await apiService.get(apiEndpoints.jobs.getAllJobs);
            setJobs(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch jobs. Please try again later.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleBookmarkToggle = (jobId) => {
        setBookmarkedJobs((prev) => {
            const updatedBookmarks = new Set(prev);
            if (updatedBookmarks.has(jobId)) {
                updatedBookmarks.delete(jobId);
            } else {
                updatedBookmarks.add(jobId);
            }
            return updatedBookmarks;
        });
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const filteredJobs = jobs.filter((job) => {
        return (
            (filters.jobType ? job.jobType === filters.jobType : true) &&
            (filters.experience ? job.jobExperience === filters.experience : true)
        );
    });

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return (
        <Container sx={{ mt: 1, p: 1, background: '#f9f9f9', borderRadius: '8px', height: '75vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* ROW 1: Breadcrumbs with Home Icon */}
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>Job Listings</Typography>
                </Breadcrumbs>
            </Box>

            {/* ROW 2: Search Bar (Left) & Filters (Right) */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                {/* Search Bar */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Search Jobs"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        margin="dense"
                        sx={{ bgcolor: 'white', borderRadius: 1, width: '50%' }}
                        InputProps={{
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearSearch} size="small">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Filters */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1} justifyContent="flex-end">
                        <Grid item xs={6} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Job Type</InputLabel>
                                <Select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Full-time">Full-Time</MenuItem>
                                    <MenuItem value="Part-time">Part-Time</MenuItem>
                                    <MenuItem value="Internship">Internship</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Experience</InputLabel>
                                <Select name="experience" value={filters.experience} onChange={handleFilterChange}>
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="0">0 Years</MenuItem>
                                    <MenuItem value="1">1 Year</MenuItem>
                                    <MenuItem value="2">2+ Years</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* ROW 3: Scrollable Job List */}
            <Box sx={{ flex: 1, overflowY: 'auto', height: '60vh', p: 1, borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <Grid container spacing={2}>
                    {currentJobs.map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job.id}>
                            <Card sx={{ p: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{job.postName}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{job.companyName}</Typography>
                                    <Typography variant="body2"><strong>Location:</strong> {job.workLocation}</Typography>
                                    <Typography variant="body2"><strong>Salary:</strong> ₹{job.jobSalary}</Typography>
                                    <Typography variant="body2"><strong>Experience:</strong> {job.jobExperience} Years</Typography>
                                    <Typography variant="body2"><strong>Last Date to Apply:</strong> {job.lastDateOfApply}</Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'right', gap: 1 }}>
                                    <IconButton onClick={() => handleBookmarkToggle(job.id)}>
                                        {bookmarkedJobs.has(job.id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                                    </IconButton>
                                    <Button variant="contained" color="primary" onClick={() => handleJobClick(job)}>
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Pagination on Right Side */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} color="primary" />
            </Box>

            <JobDetailsModal job={selectedJob} show={showModal} onClose={handleCloseModal} />
        </Container>
    );
}

export default JobList;
