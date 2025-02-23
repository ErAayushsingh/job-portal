import React, { useState, useEffect } from 'react';
import { Card, Paper, Button, TextField, Chip, Box, Typography, Stack, IconButton} from '@mui/material';
import { Add, Edit, Delete, Save, Cancel, Code } from '@mui/icons-material';
import { apiService } from '../../ApiService';
import apiEndpoints from '../../apiendpoint';
import CommonSnackbar from '../../CommonSnackbar';
import ConfirmationDialog from '../../Common/ConfirmationDialog'; // ✅ Import the common confirmation dialog

function SkillsSection() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [editingSkillText, setEditingSkillText] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, skillId: null });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await apiService.get(apiEndpoints.profile.skills.getAll);
            setSkills(response);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to fetch skills', severity: 'error' });
        }
    };

    const handleAddSkill = async () => {
        if (newSkill.trim()) {
            try {
                const response = await apiService.post(apiEndpoints.profile.skills.add, { name: newSkill.trim() });
                setSkills([...skills, response]); 
                setNewSkill('');
                setSnackbar({ open: true, message: 'Skill added successfully', severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: 'Failed to add skill', severity: 'error' });
            }
        }
    };

    const handleEditSkill = (id, name) => {
        setEditingSkillId(id);
        setEditingSkillText(name);
    };

    const handleSaveSkill = async () => {
        try {
            await apiService.put(apiEndpoints.profile.skills.update(editingSkillId), { name: editingSkillText });
            const updatedList = skills.map(skill =>
                skill.id === editingSkillId ? { ...skill, name: editingSkillText } : skill
            );
            setSkills(updatedList);
            setEditingSkillId(null);
            setSnackbar({ open: true, message: 'Skill updated successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to update skill', severity: 'error' });
        }
    };

    const handleConfirmDeleteSkill = (id) => {
        setConfirmDialog({ open: true, skillId: id });
    };

    const handleDeleteSkill = async () => {
        try {
            await apiService.delete(apiEndpoints.profile.skills.delete(confirmDialog.skillId));
            const updatedList = skills.filter(skill => skill.id !== confirmDialog.skillId);
            setSkills(updatedList);
            setConfirmDialog({ open: false, skillId: null });
            setSnackbar({ open: true, message: 'Skill deleted successfully', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete skill', severity: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditingSkillId(null);
        setEditingSkillText('');
    };

    return (
        <Card variant="outlined" sx={{ p: 3, mb: 4, boxShadow: 3 }}>
            {/* Header with Icon */}
            <Box display="flex" alignItems="center" mb={3}>
                <Code color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    Skills
                </Typography>
            </Box>


            {/* Skills List */}
            <Box mb={2} display="flex" flexWrap="wrap" gap={2}>
                {skills.length > 0 ? (
                    skills.map(skill => (
                        <Paper
                            key={skill.id}
                            elevation={editingSkillId === skill.id ? 6 : 2} // ✅ Soft shadow effect
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                p: 1.5,
                                pl: 2,
                                pr: 2,
                                borderRadius: '25px',
                                bgcolor: editingSkillId === skill.id ? '#eee' : '#eee', // Light blue for editing
                                transition: '0.3s ease-in-out',
                                boxShadow: editingSkillId === skill.id ? '0px 3px 10px rgba(0, 0, 0, 0.2)' : 'none', // ✅ Soft glow
                            }}
                        >
                            {editingSkillId === skill.id ? (
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    value={editingSkillText}
                                    onChange={(e) => setEditingSkillText(e.target.value)}
                                    sx={{ width: 140 }}
                                />
                            ) : (
                                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                                    {skill.name}
                                </Typography>
                            )}

                            {editingSkillId === skill.id ? (
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="success" onClick={handleSaveSkill}>
                                        <Save />
                                    </IconButton>
                                    <IconButton color="error" onClick={handleCancelEdit}>
                                        <Cancel />
                                    </IconButton>
                                </Stack>
                            ) : (
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => handleEditSkill(skill.id, skill.name)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleConfirmDeleteSkill(skill.id)}>
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            )}
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">No skills added yet.</Typography>
                )}
            </Box>

            {/* Add New Skill Section */}
            <Box mt={3} display="flex" gap={2} alignItems="center">
                <TextField
                    label="New Skill"
                    variant="outlined"
                    size="small"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button variant="contained" startIcon={<Add />} onClick={handleAddSkill}>
                    Add Skill
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={confirmDialog.open}
                title="Confirm Delete"
                message="Are you sure you want to delete this skill?"
                onConfirm={handleDeleteSkill}
                onCancel={() => setConfirmDialog({ open: false, skillId: null })}
                confirmText="Delete"
                confirmColor="error"
            />

            <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Card>
    );
}

export default SkillsSection;