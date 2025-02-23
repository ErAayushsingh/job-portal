import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Button, TextField, Grid, IconButton, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, School } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog'; 

function EducationSection() {
    const [educationList, setEducationList] = useState([]);
    const [newEducation, setNewEducation] = useState({
        degree: '',
        fieldOfStudy: '',
        university: '',
        startDate: '',
        endDate: '',
        grade: ''
    });
    const [editingEducationId, setEditingEducationId] = useState(null);
    const [editingEducation, setEditingEducation] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, eduId: null });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.education.getAll);
            setEducationList(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch education', severity: 'error' });
        }
    };

    const handleAddEducation = async () => {
        try {
            const response = await apiService.post(apiEndpoints.profile.education.add, newEducation);
            setEducationList([...educationList, response]);
            setNewEducation({ degree: '', fieldOfStudy: '', university: '', startDate: '', endDate: '', grade: '' });
            setSnackbar({ open: true, message: 'Education added successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to add education', severity: 'error' });
        }
    };

    const handleEditEducation = (id, education) => {
        setEditingEducationId(id);
        setEditingEducation({ ...education });
    };

    const handleSaveEducation = async () => {
        try {
            await apiService.put(apiEndpoints.profile.education.update(editingEducationId), editingEducation);
            const updatedList = educationList.map(edu =>
                edu.id === editingEducationId ? { ...editingEducation } : edu
            );
            setEducationList(updatedList);
            setEditingEducationId(null);
            setSnackbar({ open: true, message: 'Education updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update education', severity: 'error' });
        }
    };

    const handleConfirmDeleteEducation = (id) => {
        setConfirmDialog({ open: true, eduId: id });
    };

    const handleDeleteEducation = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.education.delete(confirmDialog.eduId));
            const updatedList = educationList.filter(edu => edu.id !== confirmDialog.eduId);
            setEducationList(updatedList);
            setConfirmDialog({ open: false, eduId: null });
            setSnackbar({ open: true, message: 'Education deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete education', severity: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditingEducationId(null);
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <School color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Education
                </Typography>
            </Box>

            <Stack spacing={3}>
                {educationList.map((edu) => (
                    <Paper
                        key={edu.id}
                        elevation={editingEducationId === edu.id ? 6 : 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 3,
                            borderRadius: '12px',
                            bgcolor: editingEducationId === edu.id ? '#e3f2fd' : '#ffffff',
                            transition: '0.3s ease-in-out',
                        }}
                    >
                        {editingEducationId === edu.id ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Degree"
                                        value={editingEducation.degree}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Field of Study"
                                        value={editingEducation.fieldOfStudy}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, fieldOfStudy: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="University"
                                        value={editingEducation.university}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, university: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Start Year"
                                        value={editingEducation.startDate}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, startDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="End Year"
                                        value={editingEducation.endDate}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, endDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Grade"
                                        value={editingEducation.grade}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, grade: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveEducation}>
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
                                    {edu.degree} <Typography variant="subtitle1" component="span">in {edu.fieldOfStudy}</Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {edu.university} ({edu.startDate} - {edu.endDate}) | Grade: {edu.grade}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditEducation(edu.id, edu)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteEducation(edu.id)}>
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
                message="Are you sure you want to delete this education entry?"
                onConfirm={handleDeleteEducation}
                onCancel={() => setConfirmDialog({ open: false, eduId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default EducationSection;
