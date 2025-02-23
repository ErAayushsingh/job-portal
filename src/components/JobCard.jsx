import React from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function JobCard({ job, onClick, isBookmarked, onBookmarkToggle }) {
    return (
        <Card 
            sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                p: 2, 
                textAlign: 'left', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                cursor: 'pointer'
            }}
        >
            <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>{job.postName}</Typography>
                <Typography variant="subtitle2" color="textSecondary">{job.companyName}</Typography>
                <Typography variant="body2"><strong>Location:</strong> {job.workLocation}</Typography>
                <Typography variant="body2"><strong>Experience:</strong> {job.jobExperience} years</Typography>
                <Typography variant="body2"><strong>Qualifications:</strong> {job.jobQualifications}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong>Description:</strong> {job.jobDescription || 'No description available'}
                </Typography>
            </CardContent>

            {/* Bookmark and View Buttons */}
            <Box display="flex" justifyContent="center" gap={1} pb={2}>
                <IconButton 
                    onClick={(e) => { 
                        e.stopPropagation(); // Prevents triggering card click
                        onBookmarkToggle(job.id); 
                    }}
                    sx={{ borderRadius: 2, border: '1px solid #ccc' }}
                >
                    {isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                </IconButton>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={(e) => { 
                        e.stopPropagation(); // Prevents triggering card click
                        onClick(job); 
                    }}
                >
                    View
                </Button>
            </Box>
        </Card>
    );
}

export default JobCard;
