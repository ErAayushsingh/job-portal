import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Row, Col, Form, Button } from 'react-bootstrap';


function Footer() {
    return (
        <footer className="bg-dark text-light p-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About JobPortal</h5>
                        <p>
                            JobPortal helps you find the best job opportunities and internships. Connect with top employers and kickstart your career today.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Home</a></li>
                            <li><a href="#" className="text-light">Internships</a></li>
                            <li><a href="#" className="text-light">Courses</a></li>
                            <li><a href="#" className="text-light">Jobs</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Subscribe to our Newsletter</h5>
                        <Form>
                            <Form.Group controlId="newsletterEmail">
                                <Form.Control type="email" placeholder="Enter your email" className="mb-2" />
                            </Form.Group>
                            <Button variant="primary">Subscribe</Button>
                        </Form>
                    </Col>
                </Row>
                <div className="text-center mt-3">
                    <small>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</small>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
