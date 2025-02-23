import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function CommonSnackbar({ snackbar, setSnackbar }) {
    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert severity={snackbar.severity} onClose={handleClose}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

export default CommonSnackbar;
