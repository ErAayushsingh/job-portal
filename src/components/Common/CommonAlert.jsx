import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import '../../App.css'

function CommonAlert({ message, variant = 'danger', duration = 5000 }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!show || !message) return null;

    return (
        <div className="common-alert position-fixed">
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                {message}
            </Alert>
        </div>
    );
}

export default CommonAlert;