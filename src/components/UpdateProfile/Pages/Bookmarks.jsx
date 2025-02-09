import React from 'react';
import { Card } from 'react-bootstrap';

function Bookmarks() {
    const bookmarks = [
        { id: 1, jobTitle: 'React Developer', company: 'Amazon' },
        { id: 2, jobTitle: 'Data Scientist', company: 'Netflix' },
    ];

    return (
        <div>
            <h2>My Bookmarks</h2>
            {bookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="mb-3">
                    <Card.Body>
                        <h5>{bookmark.jobTitle}</h5>
                        <p>Company: {bookmark.company}</p>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Bookmarks;
