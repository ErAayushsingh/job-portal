import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, IconButton, TextField, Grid, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, Home } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog';

function AddressSection() {
    const [address, setAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });
    const [editing, setEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false });

    useEffect(() => {
        fetchAddress();
    }, []);

    const fetchAddress = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.address.get);
            if (response) {
                setAddress(response);
            }
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch address', severity: 'error' });
        }
    };

    const handleAddAddress = async () => {
        try {
            const response = await apiService.post(apiEndpoints.profile.address.add, newAddress);
            setAddress(response);
            setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
            setSnackbar({ open: true, message: 'Address added successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to add address', severity: 'error' });
        }
    };

    const handleEditAddress = () => {
        setEditing(true);
    };

    const handleSaveAddress = async () => {
        try {
            await apiService.put(apiEndpoints.profile.address.update, address);
            setEditing(false);
            setSnackbar({ open: true, message: 'Address updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update address', severity: 'error' });
        }
    };

    const handleConfirmDeleteAddress = () => {
        setConfirmDialog({ open: true });
    };

    const handleDeleteAddress = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.address.update);
            setAddress(null);
            setEditing(false);
            setConfirmDialog({ open: false });
            setSnackbar({ open: true, message: 'Address deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete address', severity: 'error' });
        }
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Home color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Address
                </Typography>
            </Box>

            {address ? (
                <Paper
                    elevation={editing ? 6 : 2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        p: 3,
                        borderRadius: '12px',
                        bgcolor: editing ? '#e3f2fd' : '#ffffff',
                        transition: '0.3s ease-in-out',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {editing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Street"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                />
                            ) : (
                                <Typography variant="subtitle1"><strong>Street:</strong> {address.street}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {editing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="City"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                />
                            ) : (
                                <Typography variant="subtitle1"><strong>City:</strong> {address.city}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {editing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="State"
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                />
                            ) : (
                                <Typography variant="subtitle1"><strong>State:</strong> {address.state}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {editing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Zip Code"
                                    value={address.zipCode}
                                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                                />
                            ) : (
                                <Typography variant="subtitle1"><strong>Zip Code:</strong> {address.zipCode}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {editing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Country"
                                    value={address.country}
                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                />
                            ) : (
                                <Typography variant="subtitle1"><strong>Country:</strong> {address.country}</Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1} mt={2}>
                        {editing ? (
                            <>
                                <IconButton color="success" onClick={handleSaveAddress}>
                                    <Save />
                                </IconButton>
                                <IconButton color="error" onClick={() => setEditing(false)}>
                                    <Cancel />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton color="primary" onClick={handleEditAddress}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={handleConfirmDeleteAddress}>
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                    </Stack>
                </Paper>
            ) : (
                <Box mt={3}>
                    <IconButton color="primary" onClick={handleAddAddress}>
                        <Add />
                    </IconButton>
                </Box>
            )}

            <ConfirmationDialog
                open={confirmDialog.open}
                title="Confirm Delete"
                message="Are you sure you want to delete this address?"
                onConfirm={handleDeleteAddress}
                onCancel={() => setConfirmDialog({ open: false })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default AddressSection;
