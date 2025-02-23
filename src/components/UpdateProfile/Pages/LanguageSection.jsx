import React, { useState } from 'react';
import { Card, Typography, Box, Button, TextField, Grid, IconButton, Stack, Paper } from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, Language } from '@mui/icons-material';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog'; 

function LanguagesSection() {
    const [languages, setLanguages] = useState([
        { id: 1, language: 'English', proficiency: 'Advanced' },
        { id: 2, language: 'Hindi', proficiency: 'Native' },
    ]);

    const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });
    const [editingLanguageId, setEditingLanguageId] = useState(null);
    const [editingLanguage, setEditingLanguage] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, langId: null });

    const handleAddLanguage = () => {
        if (newLanguage.language && newLanguage.proficiency) {
            setLanguages([...languages, { ...newLanguage, id: Math.random() }]);
            setNewLanguage({ language: '', proficiency: '' });
            setSnackbar({ open: true, message: 'Language added successfully', severity: 'success' });
        } else {
            setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
        }
    };

    const handleEditLanguage = (id, language) => {
        setEditingLanguageId(id);
        setEditingLanguage({ ...language });
    };

    const handleSaveLanguage = () => {
        const updatedList = languages.map(lang =>
            lang.id === editingLanguageId ? { ...editingLanguage } : lang
        );
        setLanguages(updatedList);
        setEditingLanguageId(null);
        setSnackbar({ open: true, message: 'Language updated successfully', severity: 'success' });
    };

    const handleConfirmDeleteLanguage = (id) => {
        setConfirmDialog({ open: true, langId: id });
    };

    const handleDeleteLanguage = () => {
        const updatedList = languages.filter(lang => lang.id !== confirmDialog.langId);
        setLanguages(updatedList);
        setConfirmDialog({ open: false, langId: null });
        setSnackbar({ open: true, message: 'Language deleted successfully', severity: 'success' });
    };

    const handleCancelEdit = () => {
        setEditingLanguageId(null);
    };

    return (
        <Card variant="outlined" sx={{ p: 4, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Language color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Languages
                </Typography>
            </Box>

            <Stack spacing={3}>
                {languages.map((lang) => (
                    <Paper
                        key={lang.id}
                        elevation={editingLanguageId === lang.id ? 6 : 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 3,
                            borderRadius: '12px',
                            bgcolor: editingLanguageId === lang.id ? '#e3f2fd' : '#ffffff',
                            transition: '0.3s ease-in-out',
                        }}
                    >
                        {editingLanguageId === lang.id ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Language"
                                        value={editingLanguage.language}
                                        onChange={(e) => setEditingLanguage({ ...editingLanguage, language: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Proficiency"
                                        value={editingLanguage.proficiency}
                                        onChange={(e) => setEditingLanguage({ ...editingLanguage, proficiency: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <Button variant="contained" color="success" startIcon={<Save />} onClick={handleSaveLanguage}>
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
                                    {lang.language}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {lang.proficiency}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditLanguage(lang.id, lang)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteLanguage(lang.id)}>
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            </>
                        )}
                    </Paper>
                ))}
            </Stack>

            <Box mt={3}>
                <Typography variant="subtitle1" mb={1}>Add New Language</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Language"
                            value={newLanguage.language}
                            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Proficiency"
                            value={newLanguage.proficiency}
                            onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" startIcon={<Add />} onClick={handleAddLanguage}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <ConfirmationDialog
                open={confirmDialog.open}
                title="Confirm Delete"
                message="Are you sure you want to delete this language?"
                onConfirm={handleDeleteLanguage}
                onCancel={() => setConfirmDialog({ open: false, langId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default LanguagesSection;
