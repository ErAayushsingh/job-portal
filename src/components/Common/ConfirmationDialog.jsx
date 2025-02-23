import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function ConfirmationDialog({ open, title, message, onConfirm, onCancel, confirmText, confirmColor }) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color={confirmColor || "primary"} variant="contained">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
