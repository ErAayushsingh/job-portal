// import React, { useState } from 'react';
// import { Container, Card, Button, Form, ListGroup, Row, Col, Badge, Collapse } from 'react-bootstrap';
// import { FaUser, FaCode, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaLanguage, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlusCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { MdOutlineEdit, MdDelete } from 'react-icons/md';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Home() {
//     const [userDetails, setUserDetails] = useState({
//         name: 'John Doe',
//         username: 'johndoe@example.com',
//         phone: '+123456789',
//         address: '123 Main St, City, Country',
//         linkedin: 'https://linkedin.com/in/johndoe',
//         github: 'https://github.com/johndoe',
//         portfolio: 'https://johndoe.dev',
//         jobTitle: 'Software Engineer',
//         expectedSalary: '$100k',
//         summary: 'A highly motivated software engineer specializing in full-stack development.',
//         skills: 'JavaScript, React, Node.js, Python',
//     });

//     const [educationList, setEducationList] = useState([
//         { id: 1, degree: 'High School', institution: 'City High School', year: '2012', description: 'Science Major' },
//         { id: 2, degree: 'Senior Secondary', institution: 'City Senior School', year: '2014', description: 'Math and Science' },
//     ]);

//     const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '', description: '' });

//     const [certifications, setCertifications] = useState([
//         { id: 1, certification: 'AWS Certified Developer', year: '2021' },
//         { id: 2, certification: 'Microsoft Azure Fundamentals', year: '2020' },
//     ]);

//     const [newCertification, setNewCertification] = useState({ certification: '', year: '' });

//     const [employmentList, setEmploymentList] = useState([
//         {
//             id: 1,
//             company: 'Tech Corp',
//             role: 'Front-end Developer',
//             duration: '2019-2022',
//             description: 'Developed scalable front-end applications.',
//         },
//     ]);

//     const [languageList, setLanguageList] = useState([
//         { id: 1, language: 'English', proficiency: 'Advanced' },
//         { id: 2, language: 'Hindi', proficiency: 'Native' },
//     ]);

//     const [itSkills, setItSkills] = useState([
//         { id: 1, skill: 'React.js', version: '18', experience: '2 Years' },
//         { id: 2, skill: 'JavaScript', version: 'ES6', experience: '3 Years' },
//     ]);

//     const [projects, setProjects] = useState([
//         {
//             id: 1,
//             title: 'TEXT Changer',
//             duration: 'Jun 2024 - Present',
//             description: 'A project to transform text to different formats like uppercase, lowercase, reverse, etc.',
//             link: 'https://github.com/example/text-changer',
//         },
//     ]);

//     const [expandedSections, setExpandedSections] = useState({
//         profile: true,
//         education: false,
//         certifications: false,
//         employment: false,
//         languages: false,
//         itSkills: false,
//         projects: false,
//     });

//     const toggleSection = (section) => {
//         setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//     };

//     const handleAddEducation = () => {
//         if (newEducation.degree && newEducation.institution && newEducation.year) {
//             setEducationList([...educationList, { ...newEducation, id: Math.random() }]);
//             setNewEducation({ degree: '', institution: '', year: '', description: '' });
//         }
//     };

//     const handleAddCertification = () => {
//         if (newCertification.certification && newCertification.year) {
//             setCertifications([...certifications, { ...newCertification, id: Math.random() }]);
//             setNewCertification({ certification: '', year: '' });
//         }
//     };

//     const renderProfileSection = () => (
//         <Card className="mb-4 shadow-lg border-0">
//             <Card.Header
//                 className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top cursor-pointer"
//                 onClick={() => toggleSection('profile')}
//             >
//                 <div className="d-flex align-items-center">
//                     <FaUser className="me-2" style={{ fontSize: '1.5rem' }} />
//                     <h5 className="mb-0">Profile Information</h5>
//                 </div>
//                 <div>{expandedSections.profile ? <FaChevronUp /> : <FaChevronDown />}</div>
//             </Card.Header>
//             <Collapse in={expandedSections.profile}>
//                 <Card.Body className="p-4">
//                     <h4 className="text-dark mb-3">{userDetails.name}</h4>
//                     <p className="text-muted mb-2"><FaEnvelope /> {userDetails.username}</p>
//                     <p className="text-muted mb-2"><FaPhone /> {userDetails.phone}</p>
//                     <p className="text-muted mb-2"><FaMapMarkerAlt /> {userDetails.address}</p>
//                     <p className="text-muted mb-2"><strong>LinkedIn:</strong> <a href={userDetails.linkedin} target="_blank" rel="noopener noreferrer">{userDetails.linkedin}</a></p>
//                     <p className="text-muted mb-2"><strong>GitHub:</strong> <a href={userDetails.github} target="_blank" rel="noopener noreferrer">{userDetails.github}</a></p>
//                     <p className="text-muted mb-2"><strong>Portfolio:</strong> <a href={userDetails.portfolio} target="_blank" rel="noopener noreferrer">{userDetails.portfolio}</a></p>
//                     <Badge bg="primary" className="px-3 py-2">{userDetails.jobTitle}</Badge>
//                 </Card.Body>
//             </Collapse>
//         </Card>
//     );

//     const renderEducationSection = () => (
//         <Card className="mb-4 shadow-lg border-0">
//             <Card.Header
//                 className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top cursor-pointer"
//                 onClick={() => toggleSection('education')}
//             >
//                 <div className="d-flex align-items-center">
//                     <FaGraduationCap className="me-2" style={{ fontSize: '1.5rem' }} />
//                     <h5 className="mb-0">Education</h5>
//                 </div>
//                 <div>{expandedSections.education ? <FaChevronUp /> : <FaChevronDown />}</div>
//             </Card.Header>
//             <Collapse in={expandedSections.education}>
//                 <Card.Body className="p-4">
//                     <ListGroup className="mb-3">
//                         {educationList.map((edu) => (
//                             <ListGroup.Item key={edu.id} className="d-flex justify-content-between">
//                                 <div>
//                                     <h6>{edu.degree}</h6>
//                                     <small>{edu.institution} - {edu.year}</small>
//                                     <p className="text-muted">{edu.description}</p>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
//                                     <Button variant="outline-danger" size="sm" onClick={() => setEducationList(educationList.filter((e) => e.id !== edu.id))}>
//                                         <MdDelete /> Delete
//                                     </Button>
//                                 </div>
//                             </ListGroup.Item>
//                         ))}
//                     </ListGroup>
//                     <Form>
//                         <Row className="mb-3">
//                             <Col md={3}><Form.Control placeholder="Degree" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} /></Col>
//                             <Col md={3}><Form.Control placeholder="Institution" value={newEducation.institution} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })} /></Col>
//                             <Col md={2}><Form.Control placeholder="Year" value={newEducation.year} onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })} /></Col>
//                             <Col md={4}><Form.Control placeholder="Description" value={newEducation.description} onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })} /></Col>
//                         </Row>
//                         <Button variant="primary" onClick={handleAddEducation}><FaPlusCircle /> Add Education</Button>
//                     </Form>
//                 </Card.Body>
//             </Collapse>
//         </Card>
//     );

//     const renderCertificationsSection = () => (
//         <Card className="mb-4 shadow-lg border-0">
//             <Card.Header
//                 className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top cursor-pointer"
//                 onClick={() => toggleSection('certifications')}
//             >
//                 <div className="d-flex align-items-center">
//                     <FaProjectDiagram className="me-2" style={{ fontSize: '1.5rem' }} />
//                     <h5 className="mb-0">Certifications</h5>
//                 </div>
//                 <div>{expandedSections.certifications ? <FaChevronUp /> : <FaChevronDown />}</div>
//             </Card.Header>
//             <Collapse in={expandedSections.certifications}>
//                 <Card.Body className="p-4">
//                     <ListGroup className="mb-3">
//                         {certifications.map((cert) => (
//                             <ListGroup.Item key={cert.id} className="d-flex justify-content-between">
//                                 <div>
//                                     <h6>{cert.certification}</h6>
//                                     <small>{cert.year}</small>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
//                                     <Button variant="outline-danger" size="sm" onClick={() => setCertifications(certifications.filter((c) => c.id !== cert.id))}>
//                                         <MdDelete /> Delete
//                                     </Button>
//                                 </div>
//                             </ListGroup.Item>
//                         ))}
//                     </ListGroup>
//                     <Form>
//                         <Row>
//                             <Col md={8}><Form.Control placeholder="Certification" value={newCertification.certification} onChange={(e) => setNewCertification({ ...newCertification, certification: e.target.value })} /></Col>
//                             <Col md={4}><Form.Control placeholder="Year" value={newCertification.year} onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })} /></Col>
//                         </Row>
//                         <Button variant="primary" className="mt-3" onClick={handleAddCertification}><FaPlusCircle /> Add Certification</Button>
//                     </Form>
//                 </Card.Body>
//             </Collapse>
//         </Card>
//     );

//     return (
//         <Container fluid className="py-5">
//             {renderProfileSection()}
//             {renderEducationSection()}
//             {renderCertificationsSection()}
//         </Container>
//     );
// }

// export default Home;


import React, { useState } from 'react';
import { Container, Card, Button, Form, ListGroup, Row, Col, Badge, Collapse } from 'react-bootstrap';
import { FaUser, FaCode, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaLanguage, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlusCircle, FaChevronDown, FaChevronUp, FaListAlt } from 'react-icons/fa';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        username: 'johndoe@example.com',
        phone: '+123456789',
        address: '123 Main St, City, Country',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        portfolio: 'https://johndoe.dev',
        jobTitle: 'Software Engineer',
        expectedSalary: '$100k',
        summary: 'A highly motivated software engineer specializing in full-stack development.',
        skills: 'JavaScript, React, Node.js, Python',
        hobbies: 'Reading, Traveling, Coding',
    });

    const [educationList, setEducationList] = useState([
        { id: 1, degree: 'High School', institution: 'City High School', year: '2012', description: 'Science Major' },
        { id: 2, degree: 'Senior Secondary', institution: 'City Senior School', year: '2014', description: 'Math and Science' },
    ]);

    const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '', description: '' });

    const [certifications, setCertifications] = useState([
        { id: 1, certification: 'AWS Certified Developer', year: '2021' },
        { id: 2, certification: 'Microsoft Azure Fundamentals', year: '2020' },
    ]);

    const [newCertification, setNewCertification] = useState({ certification: '', year: '' });

    const [employmentList, setEmploymentList] = useState([
        {
            id: 1,
            company: 'Tech Corp',
            role: 'Front-end Developer',
            duration: '2019-2022',
            description: 'Developed scalable front-end applications.',
        },
    ]);

    const [newEmployment, setNewEmployment] = useState({ company: '', role: '', duration: '', description: '' });

    const [languageList, setLanguageList] = useState([
        { id: 1, language: 'English', proficiency: 'Advanced' },
        { id: 2, language: 'Hindi', proficiency: 'Native' },
    ]);

    const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });

    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'React.js', version: '18', experience: '2 Years' },
        { id: 2, skill: 'JavaScript', version: 'ES6', experience: '3 Years' },
    ]);

    const [newSkill, setNewSkill] = useState({ skill: '', version: '', experience: '' });

    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'TEXT Changer',
            duration: 'Jun 2024 - Present',
            description: 'A project to transform text to different formats like uppercase, lowercase, reverse, etc.',
            link: 'https://github.com/example/text-changer',
        },
    ]);

    const [newProject, setNewProject] = useState({ title: '', duration: '', description: '', link: '' });

    const [expandedSections, setExpandedSections] = useState({
        profile: true,
        education: false,
        certifications: false,
        employment: false,
        languages: false,
        itSkills: false,
        projects: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleAddEducation = () => {
        if (newEducation.degree && newEducation.institution && newEducation.year) {
            setEducationList([...educationList, { ...newEducation, id: Math.random() }]);
            setNewEducation({ degree: '', institution: '', year: '', description: '' });
        }
    };

    const handleAddCertification = () => {
        if (newCertification.certification && newCertification.year) {
            setCertifications([...certifications, { ...newCertification, id: Math.random() }]);
            setNewCertification({ certification: '', year: '' });
        }
    };

    const handleAddEmployment = () => {
        if (newEmployment.company && newEmployment.role && newEmployment.duration) {
            setEmploymentList([...employmentList, { ...newEmployment, id: Math.random() }]);
            setNewEmployment({ company: '', role: '', duration: '', description: '' });
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage.language && newLanguage.proficiency) {
            setLanguageList([...languageList, { ...newLanguage, id: Math.random() }]);
            setNewLanguage({ language: '', proficiency: '' });
        }
    };

    const handleAddSkill = () => {
        if (newSkill.skill && newSkill.version && newSkill.experience) {
            setItSkills([...itSkills, { ...newSkill, id: Math.random() }]);
            setNewSkill({ skill: '', version: '', experience: '' });
        }
    };

    const handleAddProject = () => {
        if (newProject.title && newProject.duration && newProject.description) {
            setProjects([...projects, { ...newProject, id: Math.random() }]);
            setNewProject({ title: '', duration: '', description: '', link: '' });
        }
    };

    const renderSection = (title, items, renderItem, addItem) => (
        <Card className="mb-4 shadow-lg border-0">
            <Card.Header
                className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top cursor-pointer"
                onClick={() => toggleSection(title)}
            >
                <div className="d-flex align-items-center">
                    {title === 'profile' && <FaUser className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'education' && <FaGraduationCap className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'certifications' && <FaProjectDiagram className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'employment' && <FaBriefcase className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'languages' && <FaLanguage className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'itSkills' && <FaCode className="me-2" style={{ fontSize: '1.5rem' }} />}
                    {title === 'projects' && <FaListAlt className="me-2" style={{ fontSize: '1.5rem' }} />}
                    <h5 className="mb-0">{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
                </div>
                <div>{expandedSections[title] ? <FaChevronUp /> : <FaChevronDown />}</div>
            </Card.Header>
            <Collapse in={expandedSections[title]}>
                <Card.Body className="p-4">
                    {items.length ? (
                        <ListGroup className="mb-3">
                            {items.map(renderItem)}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No items available.</p>
                    )}
                    {addItem}
                </Card.Body>
            </Collapse>
        </Card>
    );

    {
        return (
            <Container fluid className="py-2">
                 {renderSection('profile', [
    { id: 1, content: (
        <div>
            <h3 className="mb-3">{userDetails.name}</h3>
            <p><FaEnvelope className="me-2" /> {userDetails.username}</p>
            <p><FaPhone className="me-2" /> {userDetails.phone}</p>
            <p><FaMapMarkerAlt className="me-2" /> {userDetails.address}</p>
            <p><FaBriefcase className="me-2" /> {userDetails.jobTitle}</p>
            <p><strong>Expected Salary:</strong> {userDetails.expectedSalary}</p>
            <p><strong>Summary:</strong> {userDetails.summary}</p>
            <p><strong>Skills:</strong> {userDetails.skills}</p>
            <p><strong>Hobbies:</strong> {userDetails.hobbies}</p>
        </div>
    )}
], (item) => (
    <ListGroup.Item key={item.id}>{item.content}</ListGroup.Item>
), <></>)}
                {renderSection('education', educationList, (edu) => (
                    <ListGroup.Item key={edu.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{edu.degree}</h6>
                            <small>{edu.institution} - {edu.year}</small>
                            <p className="text-muted">{edu.description}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setEducationList(educationList.filter((e) => e.id !== edu.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}><Form.Control placeholder="Degree" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} /></Col>
                            <Col md={3}><Form.Control placeholder="Institution" value={newEducation.institution} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })} /></Col>
                            <Col md={2}><Form.Control placeholder="Year" value={newEducation.year} onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Description" value={newEducation.description} onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" onClick={handleAddEducation}><FaPlusCircle /> Add Education</Button>
                    </Form>
                ))}
    
                {renderSection('certifications', certifications, (cert) => (
                    <ListGroup.Item key={cert.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{cert.certification}</h6>
                            <small>{cert.year}</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setCertifications(certifications.filter((c) => c.id !== cert.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row>
                            <Col md={8}><Form.Control placeholder="Certification" value={newCertification.certification} onChange={(e) => setNewCertification({ ...newCertification, certification: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Year" value={newCertification.year} onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" className="mt-3" onClick={handleAddCertification}><FaPlusCircle /> Add Certification</Button>
                    </Form>
                ))}
    
                {renderSection('employment', employmentList, (emp) => (
                    <ListGroup.Item key={emp.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{emp.role} at {emp.company}</h6>
                            <small>{emp.duration}</small>
                            <p className="text-muted">{emp.description}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setEmploymentList(employmentList.filter((e) => e.id !== emp.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}><Form.Control placeholder="Company" value={newEmployment.company} onChange={(e) => setNewEmployment({ ...newEmployment, company: e.target.value })} /></Col>
                            <Col md={3}><Form.Control placeholder="Role" value={newEmployment.role} onChange={(e) => setNewEmployment({ ...newEmployment, role: e.target.value })} /></Col>
                            <Col md={3}><Form.Control placeholder="Duration" value={newEmployment.duration} onChange={(e) => setNewEmployment({ ...newEmployment, duration: e.target.value })} /></Col>
                            <Col md={3}><Form.Control placeholder="Description" value={newEmployment.description} onChange={(e) => setNewEmployment({ ...newEmployment, description: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" onClick={handleAddEmployment}><FaPlusCircle /> Add Employment</Button>
                    </Form>
                ))}
    
                {renderSection('languages', languageList, (lang) => (
                    <ListGroup.Item key={lang.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{lang.language}</h6>
                            <small>{lang.proficiency}</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setLanguageList(languageList.filter((l) => l.id !== lang.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}><Form.Control placeholder="Language" value={newLanguage.language} onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })} /></Col>
                            <Col md={6}><Form.Control placeholder="Proficiency" value={newLanguage.proficiency} onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" onClick={handleAddLanguage}><FaPlusCircle /> Add Language</Button>
                    </Form>
                ))}
    
                {renderSection('itSkills', itSkills, (skill) => (
                    <ListGroup.Item key={skill.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{skill.skill} (Version: {skill.version})</h6>
                            <small>{skill.experience}</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setItSkills(itSkills.filter((s) => s.id !== skill.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row className="mb-3">
                            <Col md={4}><Form.Control placeholder="Skill" value={newSkill.skill} onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Version" value={newSkill.version} onChange={(e) => setNewSkill({ ...newSkill, version: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Experience" value={newSkill.experience} onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" onClick={handleAddSkill}><FaPlusCircle /> Add Skill</Button>
                    </Form>
                ))}
    
                {renderSection('projects', projects, (project) => (
                    <ListGroup.Item key={project.id} className="d-flex justify-content-between">
                        <div>
                            <h6>{project.title}</h6>
                            <small>{project.duration}</small>
                            <p className="text-muted">{project.description}</p>
                            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>}
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => setProjects(projects.filter((p) => p.id !== project.id))}>
                                <MdDelete /> Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ), (
                    <Form>
                        <Row className="mb-3">
                            <Col md={4}><Form.Control placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Duration" value={newProject.duration} onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })} /></Col>
                            <Col md={4}><Form.Control placeholder="Link" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} /></Col>
                        </Row>
                        <Row>
                            <Col><Form.Control placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} /></Col>
                        </Row>
                        <Button variant="primary" onClick={handleAddProject} className="mt-3"><FaPlusCircle /> Add Project</Button>
                    </Form>
                ))}
            </Container>
        );
    }
}
    export default Home;
    