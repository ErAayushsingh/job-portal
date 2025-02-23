import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Button, TextField, Grid, IconButton, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, Work } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog';

function WorkExperienceSection() {
    const [workExperience, setWorkExperience] = useState([]);
    const [newWorkExperience, setNewWorkExperience] = useState({
        companyName: '',
        jobTitle: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [editingWorkId, setEditingWorkId] = useState(null);
    const [editingWork, setEditingWork] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, workId: null });

    useEffect(() => {
        fetchWorkExperience();
    }, []);

    const fetchWorkExperience = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.workExperience.getAll);
            setWorkExperience(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch work experience', severity: 'error' });
        }
    };

    const handleAddWorkExperience = async () => {
        try {
            const response = await apiService.post(apiEndpoints.profile.workExperience.add, newWorkExperience);
            setWorkExperience([...workExperience, response]);
            setNewWorkExperience({ companyName: '', jobTitle: '', location: '', startDate: '', endDate: '', description: '' });
            setSnackbar({ open: true, message: 'Work experience added successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to add work experience', severity: 'error' });
        }
    };

    const handleEditWorkExperience = (id, experience) => {
        setEditingWorkId(id);
        setEditingWork({ ...experience });
    };

    const handleSaveWorkExperience = async () => {
        try {
            await apiService.put(apiEndpoints.profile.workExperience.update(editingWorkId), editingWork);
            const updatedList = workExperience.map(exp =>
                exp.id === editingWorkId ? { ...editingWork } : exp
            );
            setWorkExperience(updatedList);
            setEditingWorkId(null);
            setSnackbar({ open: true, message: 'Work experience updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update work experience', severity: 'error' });
        }
    };

    const handleConfirmDeleteWorkExperience = (id) => {
        setConfirmDialog({ open: true, workId: id });
    };

    const handleDeleteWorkExperience = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.workExperience.delete(confirmDialog.workId));
            const updatedList = workExperience.filter(exp => exp.id !== confirmDialog.workId);
            setWorkExperience(updatedList);
            setConfirmDialog({ open: false, workId: null });
            setSnackbar({ open: true, message: 'Work experience deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete work experience', severity: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditingWorkId(null);
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Work color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Work Experience
                </Typography>
            </Box>

            <Stack spacing={3}>
                {workExperience.map((exp) => (
                    <Paper
                        key={exp.id}
                        elevation={editingWorkId === exp.id ? 6 : 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 3,
                            borderRadius: '12px',
                            bgcolor: editingWorkId === exp.id ? '#e3f2fd' : '#ffffff',
                            transition: '0.3s ease-in-out',
                        }}
                    >
                        {editingWorkId === exp.id ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Company Name"
                                        value={editingWork.companyName}
                                        onChange={(e) => setEditingWork({ ...editingWork, companyName: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Job Title"
                                        value={editingWork.jobTitle}
                                        onChange={(e) => setEditingWork({ ...editingWork, jobTitle: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Location"
                                        value={editingWork.location}
                                        onChange={(e) => setEditingWork({ ...editingWork, location: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Start Date"
                                        value={editingWork.startDate}
                                        onChange={(e) => setEditingWork({ ...editingWork, startDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="End Date"
                                        value={editingWork.endDate}
                                        onChange={(e) => setEditingWork({ ...editingWork, endDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Description"
                                        value={editingWork.description}
                                        onChange={(e) => setEditingWork({ ...editingWork, description: e.target.value })}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveWorkExperience}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="error" startIcon={<Cancel />} onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Typography variant="h6">
                                    {exp.jobTitle} <Typography variant="subtitle1" component="span">at {exp.companyName}</Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {exp.location} ({exp.startDate} - {exp.endDate})
                                </Typography>
                                <Typography variant="body2">{exp.description}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditWorkExperience(exp.id, exp)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteWorkExperience(exp.id)}>
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            </>
                        )}
                    </Paper>
                ))}
            </Stack>

            <ConfirmationDialog
                open={confirmDialog.open}
                title="Confirm Delete"
                message="Are you sure you want to delete this work experience?"
                onConfirm={handleDeleteWorkExperience}
                onCancel={() => setConfirmDialog({ open: false, workId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default WorkExperienceSection;
