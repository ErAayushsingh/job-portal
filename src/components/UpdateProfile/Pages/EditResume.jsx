import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditResume() {
    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleUpload = () => {
        if (resume) {
            alert(`Uploaded ${resume.name} successfully!`);
        }
    };

    return (
        <div>
            <h2>Edit Resume</h2>
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Your Resume</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Form>
        </div>
    );
}

export default EditResume;
