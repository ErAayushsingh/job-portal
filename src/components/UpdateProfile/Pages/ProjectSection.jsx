import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Button, TextField, Grid, IconButton, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, Folder } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog';

function ProjectsSection() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', startDate: '', endDate: '' });
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editingProject, setEditingProject] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, projectId: null });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.project.getAll);
            setProjects(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch projects', severity: 'error' });
        }
    };

    const handleAddProject = async () => {
        try {
            const response = await apiService.post(apiEndpoints.profile.project.add, newProject);
            setProjects([...projects, response]);
            setNewProject({ title: '', description: '', startDate: '', endDate: '' });
            setSnackbar({ open: true, message: 'Project added successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to add project', severity: 'error' });
        }
    };

    const handleEditProject = (id, project) => {
        setEditingProjectId(id);
        setEditingProject({ ...project });
    };

    const handleSaveProject = async () => {
        try {
            await apiService.put(apiEndpoints.profile.project.update(editingProjectId), editingProject);
            const updatedList = projects.map(proj =>
                proj.id === editingProjectId ? { ...editingProject } : proj
            );
            setProjects(updatedList);
            setEditingProjectId(null);
            setSnackbar({ open: true, message: 'Project updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update project', severity: 'error' });
        }
    };

    const handleConfirmDeleteProject = (id) => {
        setConfirmDialog({ open: true, projectId: id });
    };

    const handleDeleteProject = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.project.delete(confirmDialog.projectId));
            const updatedList = projects.filter(proj => proj.id !== confirmDialog.projectId);
            setProjects(updatedList);
            setConfirmDialog({ open: false, projectId: null });
            setSnackbar({ open: true, message: 'Project deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete project', severity: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditingProjectId(null);
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Folder color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Projects
                </Typography>
            </Box>

            <Stack spacing={3}>
                {projects.map((proj) => (
                    <Paper
                        key={proj.id}
                        elevation={editingProjectId === proj.id ? 6 : 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 3,
                            borderRadius: '12px',
                            bgcolor: editingProjectId === proj.id ? '#e3f2fd' : '#ffffff',
                            transition: '0.3s ease-in-out',
                        }}
                    >
                        {editingProjectId === proj.id ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Project Title"
                                        value={editingProject.title}
                                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Start Date"
                                        value={editingProject.startDate}
                                        onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="End Date"
                                        value={editingProject.endDate}
                                        onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Description"
                                        value={editingProject.description}
                                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveProject}>
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
                                    {proj.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ({proj.startDate} - {proj.endDate})
                                </Typography>
                                <Typography variant="body2">{proj.description}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditProject(proj.id, proj)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteProject(proj.id)}>
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
                message="Are you sure you want to delete this project?"
                onConfirm={handleDeleteProject}
                onCancel={() => setConfirmDialog({ open: false, projectId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default ProjectsSection;
