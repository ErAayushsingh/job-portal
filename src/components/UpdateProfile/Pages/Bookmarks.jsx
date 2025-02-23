import React, { useEffect, useState } from 'react';
import { Grid, Card,Container, CardContent, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Bookmarks() {
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

    useEffect(() => {
        // ✅ Retrieve bookmarked jobs from localStorage
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        setBookmarkedJobs(savedBookmarks);
    }, []);

    return (
        <Container sx={{ mt: 1, p: 2, background: '#f9f9f9', borderRadius: '8px', height: '75vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Breadcrumbs */}
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>My Bookmarks</Typography>
                </Breadcrumbs>
            </Box>

            <Typography variant="h4" gutterBottom>My Bookmarked Jobs</Typography>

            {/* Bookmarked Jobs Grid */}
            <Box sx={{ flex: 1, overflowY: 'auto', height: '60vh', p: 1, borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <Grid container spacing={2}>
                    {bookmarkedJobs.length > 0 ? (
                        bookmarkedJobs.map((job) => (
                            <Grid item xs={12} sm={6} md={4} key={job.id}>
                                <Card sx={{ p: 2, height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" color="primary">{job.postName}</Typography>
                                        <Typography variant="subtitle2" color="textSecondary">{job.companyName}</Typography>
                                        <Typography variant="body2"><strong>Location:</strong> {job.workLocation}</Typography>
                                        <Typography variant="body2"><strong>Salary:</strong> ₹{job.jobSalary}</Typography>
                                        <Typography variant="body2"><strong>Experience:</strong> {job.jobExperience} Years</Typography>
                                        <Typography variant="body2"><strong>Last Date to Apply:</strong> {job.lastDateOfApply}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
                            No bookmarked jobs yet.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}

export default Bookmarks;
