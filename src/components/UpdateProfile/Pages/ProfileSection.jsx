import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Stack, Divider, IconButton, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, Work, CurrencyRupee, Description, Build, Favorite, Edit, Save, Cancel, Delete } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import ConfirmationDialog from '../../Common/ConfirmationDialog';
import CommonSnackbar from '../../CommonSnackbar';

function ProfileSection({ userDetails }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [editing, setEditing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ open: false });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Editable Fields
    const [profileData, setProfileData] = useState({
        phone: '',
        address: '',
        jobTitle: '',
        expectedSalary: '',
        summary: '',
        skills: '',
        hobbies: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserName(parsedUser.name || 'User');
            setUserEmail(parsedUser.username || 'No email provided');
        }

        if (userDetails) {
            setProfileData({
                phone: userDetails.phone || '',
                address: userDetails.address || '',
                jobTitle: userDetails.jobTitle || '',
                expectedSalary: userDetails.expectedSalary || '',
                summary: userDetails.summary || '',
                skills: Array.isArray(userDetails.skills) ? userDetails.skills.join(', ') : userDetails.skills || '',
                hobbies: userDetails.hobbies || ''
            });
        }
    }, [userDetails]);

    // Handle Edit Toggle
    const handleEdit = () => {
        setEditing(true);
    };

    // Handle Save
    const handleSave = async () => {
        try {
            await apiService.put(apiEndpoints.profile.user.update, profileData);
            setEditing(false);
            setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
        }
    };

    // Handle Cancel
    const handleCancel = () => {
        setEditing(false);
        setProfileData({
            phone: userDetails.phone || '',
            address: userDetails.address || '',
            jobTitle: userDetails.jobTitle || '',
            expectedSalary: userDetails.expectedSalary || '',
            summary: userDetails.summary || '',
            skills: Array.isArray(userDetails.skills) ? userDetails.skills.join(', ') : userDetails.skills || '',
            hobbies: userDetails.hobbies || ''
        });
    };

    // Handle Delete Profile Confirmation
    const handleConfirmDelete = () => {
        setConfirmDialog({ open: true });
    };

    // Handle Delete Profile
    const handleDeleteProfile = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.user.delete);
            setConfirmDialog({ open: false });
            setSnackbar({ open: true, message: 'Profile deleted successfully', severity: 'success' });
            localStorage.removeItem('user');
            // Redirect or refresh the page
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete profile', severity: 'error' });
        }
    };

    return (
        <Card variant="outlined" sx={{ p: 3, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
                {/* User Name & Email */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {userEmail}
                        </Typography>
                    </Box>

                    {/* Edit & Delete Icons */}
                    {!editing ? (
                        <Box>
                            <IconButton color="primary" onClick={handleEdit}>
                                <Edit />
                            </IconButton>
                            <IconButton color="error" onClick={handleConfirmDelete}>
                                <Delete />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box>
                            <IconButton color="success" onClick={handleSave}>
                                <Save />
                            </IconButton>
                            <IconButton color="error" onClick={handleCancel}>
                                <Cancel />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* User Details */}
                <Stack spacing={2}>
                    <Box display="flex" alignItems="center">
                        <Phone color="primary" sx={{ mr: 1 }} />
                        {editing ? (
                            <TextField fullWidth size="small" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                        ) : (
                            <Typography variant="subtitle1"><strong>Phone:</strong> {profileData.phone}</Typography>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center">
                        <LocationOn color="primary" sx={{ mr: 1 }} />
                        {editing ? (
                            <TextField fullWidth size="small" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} />
                        ) : (
                            <Typography variant="subtitle1"><strong>Address:</strong> {profileData.address}</Typography>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Work color="primary" sx={{ mr: 1 }} />
                        {editing ? (
                            <TextField fullWidth size="small" value={profileData.jobTitle} onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })} />
                        ) : (
                            <Typography variant="subtitle1"><strong>Job Title:</strong> {profileData.jobTitle}</Typography>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center">
                        <CurrencyRupee color="primary" sx={{ mr: 1 }} />
                        {editing ? (
                            <TextField fullWidth size="small" value={profileData.expectedSalary} onChange={(e) => setProfileData({ ...profileData, expectedSalary: e.target.value })} />
                        ) : (
                            <Typography variant="subtitle1"><strong>Expected Salary:</strong> ₹{profileData.expectedSalary}</Typography>
                        )}
                    </Box>
                </Stack>
            </CardContent>

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={confirmDialog.open}
                title="Confirm Delete"
                message="Are you sure you want to delete your profile? This action cannot be undone."
                onConfirm={handleDeleteProfile}
                onCancel={() => setConfirmDialog({ open: false })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default ProfileSection;
