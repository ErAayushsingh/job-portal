import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Button, TextField, Grid, IconButton, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, WorkspacePremium } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog'; 

function CertificationSection() {
    const [certifications, setCertifications] = useState([]);
    const [newCertification, setNewCertification] = useState({ name: '', organization: '', issueDate: '', expiryDate: '' });
    const [editingCertificationId, setEditingCertificationId] = useState(null);
    const [editingCertification, setEditingCertification] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, certId: null });

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.certification.getAll);
            setCertifications(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch certifications', severity: 'error' });
        }
    };

    const handleAddCertification = async () => {
        try {
            const response = await apiService.post(apiEndpoints.profile.certification.add, newCertification);
            setCertifications([...certifications, response]);
            setNewCertification({ name: '', organization: '', issueDate: '', expiryDate: '' });
            setSnackbar({ open: true, message: 'Certification added successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to add certification', severity: 'error' });
        }
    };

    const handleEditCertification = (id, certification) => {
        setEditingCertificationId(id);
        setEditingCertification({ ...certification });
    };

    const handleSaveCertification = async () => {
        try {
            await apiService.put(apiEndpoints.profile.certification.update(editingCertificationId), editingCertification);
            const updatedList = certifications.map(cert =>
                cert.id === editingCertificationId ? { ...editingCertification } : cert
            );
            setCertifications(updatedList);
            setEditingCertificationId(null);
            setSnackbar({ open: true, message: 'Certification updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update certification', severity: 'error' });
        }
    };

    const handleConfirmDeleteCertification = (id) => {
        setConfirmDialog({ open: true, certId: id });
    };

    const handleDeleteCertification = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.certification.delete(confirmDialog.certId));
            const updatedList = certifications.filter(cert => cert.id !== confirmDialog.certId);
            setCertifications(updatedList);
            setConfirmDialog({ open: false, certId: null });
            setSnackbar({ open: true, message: 'Certification deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete certification', severity: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditingCertificationId(null);
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <WorkspacePremium color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Certifications
                </Typography>
            </Box>

            <Stack spacing={3}>
                {certifications.map((cert) => (
                    <Paper
                        key={cert.id}
                        elevation={editingCertificationId === cert.id ? 6 : 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 3,
                            borderRadius: '12px',
                            bgcolor: editingCertificationId === cert.id ? '#e3f2fd' : '#ffffff',
                            transition: '0.3s ease-in-out',
                        }}
                    >
                        {editingCertificationId === cert.id ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Certification Name"
                                        value={editingCertification.name}
                                        onChange={(e) => setEditingCertification({ ...editingCertification, name: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Organization"
                                        value={editingCertification.organization}
                                        onChange={(e) => setEditingCertification({ ...editingCertification, organization: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Issue Date"
                                        value={editingCertification.issueDate}
                                        onChange={(e) => setEditingCertification({ ...editingCertification, issueDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Expiry Date"
                                        value={editingCertification.expiryDate}
                                        onChange={(e) => setEditingCertification({ ...editingCertification, expiryDate: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveCertification}>
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
                                    {cert.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {cert.organization} ({cert.issueDate} - {cert.expiryDate})
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditCertification(cert.id, cert)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteCertification(cert.id)}>
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
                message="Are you sure you want to delete this certification?"
                onConfirm={handleDeleteCertification}
                onCancel={() => setConfirmDialog({ open: false, certId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default CertificationSection;
