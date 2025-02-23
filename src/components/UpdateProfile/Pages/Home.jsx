// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, Form, ListGroup, Row, Col, Badge, Collapse } from 'react-bootstrap';
// import { FaUser, FaCode, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaLanguage, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlusCircle, FaChevronDown, FaChevronUp, FaListAlt } from 'react-icons/fa';
// import { MdOutlineEdit, MdDelete, MdSave, MdCancel } from 'react-icons/md';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { apiService } from '../../ApiService';
// import apiEndpoints from '../../apiendpoint';
// import Swal from 'sweetalert2';
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
//         hobbies: 'Reading, Traveling, Coding',
//     });

//     const [languageList, setLanguageList] = useState([
//         { id: 1, language: 'English', proficiency: 'Advanced' },
//         { id: 2, language: 'Hindi', proficiency: 'Native' },
//     ]);

//     const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });

//     const [itSkills, setItSkills] = useState([
//         { id: 1, skill: 'React.js', version: '18', experience: '2 Years' },
//         { id: 2, skill: 'JavaScript', version: 'ES6', experience: '3 Years' },
//     ]);

//     const [expandedSections, setExpandedSections] = useState({
//         profile: true,
//         education: false,
//         certifications: false,
//         employment: false,
//         languages: false,
//         itSkills: false,
//         projects: false,
//         addresses:false,
//     });

//     const toggleSection = (section) => {
//         setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//     };
//     const [workExperience, setWorkExperience] = useState([]);
//     const [skills, setSkills] = useState([]);
//     const [educationList, setEducationList] = useState([]);
//     const [certifications, setCertifications] = useState([]);
//     const [newEducation, setNewEducation] = useState({ degree: '', fieldOfStudy: '', university: '', startDate: '', endDate: '', grade: '' });
//     const [newCertification, setNewCertification] = useState({ name: '', organization: '', issueDate: '', expiryDate: '' });
//     const [newSkill, setNewSkill] = useState({ name: '', proficiencyLevel: null });
//     const [editSkill, setEditSkill] = useState(null);
//     const [newWorkExperience, setNewWorkExperience] = useState({
//         companyName: '',
//         jobTitle: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         description: ''
//     });

//     const [projects, setProjects] = useState([]);
//     const [addresses, setAddresses] = useState([]);

//     const [newProject, setNewProject] = useState({
//         title: '',
//         description: '',
//         startDate: '',
//         endDate: ''
//     });

//     const [newAddress, setNewAddress] = useState({
//         city: '',
//         state: '',
//         postalCode: '',
//         country: ''
//     });

//     useEffect(() => {
//         fetchEducation();
//         fetchCertifications();
//         fetchWorkExperience();
//         fetchSkills();
//         fetchProjects();
//         fetchAddresses();
//     }, []);

//     const fetchEducation = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.education.getAll);
//             setEducationList(response);
//         } catch (err) {
//             console.error('Failed to fetch education:', err);
//         }
//     };

//     const fetchCertifications = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.certification.getAll);
//             setCertifications(response);
//         } catch (err) {
//             console.error('Failed to fetch certifications:', err);
//         }
//     };

//     const handleAddEducation = async () => {
//         if (newEducation.degree && newEducation.fieldOfStudy && newEducation.university && newEducation.startDate && newEducation.endDate) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.education.add, newEducation);
//                 setEducationList([...educationList, response]);
//                 setNewEducation({ degree: '', fieldOfStudy: '', university: '', startDate: '', endDate: '', grade: '' });
//             } catch (err) {
//                 console.error('Failed to add education:', err);
//             }
//         }
//     };

//     const handleDeleteEducation = async (id) => {
//         try {
//             await apiService.delete(apiEndpoints.profile.education.delete(id));
//             setEducationList(educationList.filter((edu) => edu.id !== id));
//         } catch (err) {
//             console.error('Failed to delete education:', err);
//         }
//     };

//     const handleAddCertification = async () => {
//         if (newCertification.name && newCertification.organization && newCertification.issueDate && newCertification.expiryDate) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.certification.add, newCertification);
//                 setCertifications([...certifications, response]);
//                 setNewCertification({ name: '', organization: '', issueDate: '', expiryDate: '' });
//             } catch (err) {
//                 console.error('Failed to add certification:', err);
//             }
//         }
//     };

//     const handleDeleteCertification = async (id) => {
//         try {
//             await apiService.delete(apiEndpoints.profile.certification.delete(id));
//             setCertifications(certifications.filter((cert) => cert.id !== id));
//         } catch (err) {
//             console.error('Failed to delete certification:', err);
//         }
//     };

//     const fetchWorkExperience = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.workExperience.getAll);
//             setWorkExperience(response);
//         } catch (err) {
//             console.error('Failed to fetch work experience:', err);
//         }
//     };

//     /** ADD DATA */
//     const handleAddWorkExperience = async () => {
//         if (newWorkExperience.companyName && newWorkExperience.jobTitle && newWorkExperience.startDate && newWorkExperience.endDate) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.workExperience.add, newWorkExperience);
//                 setWorkExperience([...workExperience, response]);
//                 setNewWorkExperience({ companyName: '', jobTitle: '', location: '', startDate: '', endDate: '', description: '' });
//             } catch (err) {
//                 console.error('Failed to add work experience:', err);
//             }
//         }
//     };

//     /** DELETE DATA */
//     const handleDeleteWorkExperience = async (id) => {
//         try {
//             await apiService.delete(apiEndpoints.profile.workExperience.delete(id));
//             setWorkExperience(workExperience.filter((exp) => exp.id !== id));
//         } catch (err) {
//             console.error('Failed to delete work experience:', err);
//         }
//     };


//     const handleAddLanguage = () => {
//         if (newLanguage.language && newLanguage.proficiency) {
//             setLanguageList([...languageList, { ...newLanguage, id: Math.random() }]);
//             setNewLanguage({ language: '', proficiency: '' });
//         }
//     };

//      /** FETCH DATA */
//     const fetchProjects = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.project.getAll);
//             setProjects(response);
//         } catch (err) {
//             console.error('Failed to fetch projects:', err);
//         }
//     };

//     const fetchAddresses = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.address.get);
//             setAddresses([response]); 
//         } catch (err) {
//             console.error('Failed to fetch address:', err);
//         }
//     };
    

//     /** ADD DATA */
//     const handleAddProject = async () => {
//         if (newProject.title && newProject.startDate && newProject.endDate) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.project.add, newProject);
//                 setProjects([...projects, response]);
//                 setNewProject({ title: '', description: '', startDate: '', endDate: '' });
//             } catch (err) {
//                 console.error('Failed to add project:', err);
//             }
//         }
//     };

//     const handleAddAddress = async () => {
//         if (newAddress.city && newAddress.state && newAddress.postalCode && newAddress.country) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.address.add, newAddress);
//                 setAddresses([...addresses, response]);
//                 setNewAddress({ city: '', state: '', postalCode: '', country: '' });
//             } catch (err) {
//                 console.error('Failed to add address:', err);
//             }
//         }
//     };

//     /** DELETE DATA */
//     const handleDeleteProject = async (id) => {
//         try {
//             await apiService.delete(apiEndpoints.profile.project.delete(id));
//             setProjects(projects.filter((proj) => proj.id !== id));
//         } catch (err) {
//             console.error('Failed to delete project:', err);
//         }
//     };

//     const handleDeleteAddress = async (id) => {
//         try {
//             await apiService.delete(apiEndpoints.profile.address.delete(id));
//             setAddresses(addresses.filter((addr) => addr.id !== id));
//         } catch (err) {
//             console.error('Failed to delete address:', err);
//         }
//     };

//     const fetchSkills = async () => {
//         try {
//             const response = await apiService.get(apiEndpoints.profile.skills.getAll);
//             setSkills(response);
//         } catch (err) {
//             console.error('Failed to fetch skills:', err);
//         }
//     };

//     const handleAddSkill = async () => {
//         if (newSkill.name) {
//             try {
//                 const response = await apiService.post(apiEndpoints.profile.skills.add, newSkill);
//                 setSkills([...skills, response]);
//                 setNewSkill({ name: '', proficiencyLevel: '' });
//             } catch (err) {
//                 console.error('Failed to add skill:', err);
//             }
//         }
//     };

//     const handleEditSkill = (skill) => {
//         setEditSkill({ ...skill });
//     };

//     const handleSaveSkill = async () => {
//         if (editSkill) {
//             try {
//                 await apiService.put(apiEndpoints.profile.skills.update(editSkill.id), editSkill);
//                 setSkills(skills.map((skill) => (skill.id === editSkill.id ? editSkill : skill)));
//                 setEditSkill(null);
//             } catch (err) {
//                 console.error('Failed to update skill:', err);
//             }
//         }
//     };

//     const handleCancelEdit = () => {
//         setEditSkill(null);
//     };

//     const handleDeleteSkill = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'This skill will be permanently deleted!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await apiService.delete(apiEndpoints.profile.skills.delete(id));
//                     setSkills(skills.filter((skill) => skill.id !== id));
//                     Swal.fire('Deleted!', 'Your skill has been removed.', 'success');
//                 } catch (err) {
//                     Swal.fire('Error!', 'Failed to delete skill.', 'error');
//                 }
//             }
//         });
//     };
    


//     const renderSection = (title, items, renderItem, addItem) => (
//         <Card className="mb-4 shadow-lg border-0">
//             <Card.Header
//                 className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top cursor-pointer"
//                 onClick={() => toggleSection(title)}
//             >
//                 <div className="d-flex align-items-center">
//                     {title === 'profile' && <FaUser className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'education' && <FaGraduationCap className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'certifications' && <FaProjectDiagram className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'employment' && <FaBriefcase className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'languages' && <FaLanguage className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'itSkills' && <FaCode className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     {title === 'projects' && <FaListAlt className="me-2" style={{ fontSize: '1.5rem' }} />}
//                     <h5 className="mb-0">{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
//                 </div>
//                 <div>{expandedSections[title] ? <FaChevronUp /> : <FaChevronDown />}</div>
//             </Card.Header>
//             <Collapse in={expandedSections[title]}>
//                 <Card.Body className="p-4">
//                     {items.length ? (
//                         <ListGroup className="mb-3">
//                             {items.map(renderItem)}
//                         </ListGroup>
//                     ) : (
//                         <p className="text-muted">No items available.</p>
//                     )}
//                     {addItem}
//                 </Card.Body>
//             </Collapse>
//         </Card>
//     );

//     {
//         return (
//             <Container fluid className="py-2">
//                  {renderSection('profile', [
//     { id: 1, content: (
//         <div>
//             <h3 className="mb-3">{userDetails.name}</h3>
//             <p><FaEnvelope className="me-2" /> {userDetails.username}</p>
//             <p><FaPhone className="me-2" /> {userDetails.phone}</p>
//             <p><FaMapMarkerAlt className="me-2" /> {userDetails.address}</p>
//             <p><FaBriefcase className="me-2" /> {userDetails.jobTitle}</p>
//             <p><strong>Expected Salary:</strong> {userDetails.expectedSalary}</p>
//             <p><strong>Summary:</strong> {userDetails.summary}</p>
//             <p><strong>Skills:</strong> {userDetails.skills}</p>
//             <p><strong>Hobbies:</strong> {userDetails.hobbies}</p>
//         </div>
//     )}
// ], (item) => (
//     <ListGroup.Item key={item.id}>{item.content}</ListGroup.Item>
// ), <></>)}

//           {/* Skills Section */}
//           <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('skills')}>
//                     <div className="d-flex align-items-center">
//                         <FaCode className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Skills</h5>
//                     </div>
//                     <div>{expandedSections.skills ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.skills}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {skills.map((skill) => (
//                                 <ListGroup.Item key={skill.id} className="d-flex justify-content-between align-items-center p-3" style={{ borderRadius: '10px', background: '#f9f9f9' }}>
//                                     {editSkill && editSkill.id === skill.id ? (
//                                         <Form.Control
//                                             value={editSkill.name}
//                                             onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
//                                             style={{
//                                                 flex: 1,
//                                                 borderRadius: '8px',
//                                                 border: '1px solid #ccc',
//                                                 padding: '5px 10px',
//                                             }}
//                                         />
//                                     ) : (
//                                         <h6 className="m-0">{skill.name}</h6>
//                                     )}

//                                     <div>
//                                         {editSkill && editSkill.id === skill.id ? (
//                                             <>
//                                                 <Button
//                                                     variant="success"
//                                                     size="sm"
//                                                     className="me-2"
//                                                     onClick={handleSaveSkill}
//                                                     style={{ borderRadius: '8px', padding: '5px 10px' }}
//                                                 >
//                                                     <MdSave className="me-1" /> Save
//                                                 </Button>
//                                                 <Button
//                                                     variant="outline-secondary"
//                                                     size="sm"
//                                                     onClick={handleCancelEdit}
//                                                     style={{ borderRadius: '8px', padding: '5px 10px' }}
//                                                 >
//                                                     <MdCancel className="me-1" /> Cancel
//                                                 </Button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Button
//                                                     variant="outline-primary"
//                                                     size="sm"
//                                                     className="me-2"
//                                                     onClick={() => handleEditSkill(skill)}
//                                                     style={{ borderRadius: '8px', padding: '5px 10px' }}
//                                                 >
//                                                     <MdOutlineEdit className="me-1" /> Edit
//                                                 </Button>
//                                                 <Button
//                                                     variant="outline-danger"
//                                                     size="sm"
//                                                     onClick={() => handleDeleteSkill(skill.id)}
//                                                     style={{ borderRadius: '8px', padding: '5px 10px' }}
//                                                 >
//                                                     <MdDelete className="me-1" /> Delete
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         {/* Add Skill Form */}
//                         <Form>
//                             <Row className="mb-3">
//                                 <Col md={6}>
//                                     <Form.Control
//                                         placeholder="Skill Name"
//                                         value={newSkill.name}
//                                         onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
//                                         style={{
//                                             borderRadius: '8px',
//                                             border: '1px solid #ccc',
//                                             padding: '8px 10px',
//                                         }}
//                                     />
//                                 </Col>
//                             </Row>
//                             <Button
//                                 variant="primary"
//                                 onClick={handleAddSkill}
//                                 style={{
//                                     borderRadius: '8px',
//                                     padding: '8px 15px',
//                                     fontSize: '14px',
//                                 }}
//                             >
//                                 <FaPlusCircle className="me-1" /> Add Skill
//                             </Button>
//                         </Form>
//                     </Card.Body>
//                 </Collapse>
//             </Card>

//               <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('education')}>
//                     <div className="d-flex align-items-center">
//                         <FaGraduationCap className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Education</h5>
//                     </div>
//                     <div>{expandedSections.education ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.education}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {educationList.map((edu) => (
//                                 <ListGroup.Item key={edu.id} className="d-flex justify-content-between">
//                                     <div>
//                                         <h6>{edu.degree} - {edu.fieldOfStudy}</h6>
//                                         <small>{edu.university} ({edu.startDate} - {edu.endDate})</small>
//                                         <p className="text-muted">Grade: {edu.grade}</p>
//                                     </div>
//                                     <div className="d-flex align-items-center">
//                                         <Button variant="outline-danger" size="sm" onClick={() => handleDeleteEducation(edu.id)}>
//                                             <MdDelete /> Delete
//                                         </Button>
//                                     </div>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         <Form>
//                             <Row className="mb-3">
//                                 <Col md={2}><Form.Control placeholder="Degree" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="Field of Study" value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="University" value={newEducation.university} onChange={(e) => setNewEducation({ ...newEducation, university: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="Start Year" value={newEducation.startDate} onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="End Year" value={newEducation.endDate} onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="Grade" value={newEducation.grade} onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })} /></Col>
//                             </Row>
//                             <Button variant="primary" onClick={handleAddEducation}><FaPlusCircle /> Add Education</Button>
//                         </Form>
//                     </Card.Body>
//                 </Collapse>
//             </Card>
        
//             {/* Certification Section */}
//             <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('certifications')}>
//                     <div className="d-flex align-items-center">
//                         <FaProjectDiagram className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Certifications</h5>
//                     </div>
//                     <div>{expandedSections.certifications ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.certifications}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {certifications.map((cert) => (
//                                 <ListGroup.Item key={cert.id} className="d-flex justify-content-between">
//                                     <div>
//                                         <h6>{cert.name}</h6>
//                                         <small>{cert.organization} ({cert.issueDate} - {cert.expiryDate})</small>
//                                     </div>
//                                     <div className="d-flex align-items-center">
//                                         <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCertification(cert.id)}>
//                                             <MdDelete /> Delete
//                                         </Button>
//                                     </div>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                         <Button variant="primary" onClick={handleAddCertification}><FaPlusCircle /> Add Certification</Button>
//                     </Card.Body>
//                 </Collapse>
//             </Card>

//             {/* Work Experience Section */}
//             <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('workExperience')}>
//                     <div className="d-flex align-items-center">
//                         <FaBriefcase className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Work Experience</h5>
//                     </div>
//                     <div>{expandedSections.workExperience ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.workExperience}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {workExperience.map((exp) => (
//                                 <ListGroup.Item key={exp.id} className="d-flex justify-content-between">
//                                     <div>
//                                         <h6>{exp.jobTitle} at {exp.companyName}</h6>
//                                         <small>{exp.location}</small>
//                                         <small> ({exp.startDate} - {exp.endDate})</small>
//                                         <p className="text-muted">{exp.description}</p>
//                                     </div>
//                                     <Button variant="outline-danger" size="sm" onClick={() => handleDeleteWorkExperience(exp.id)}>
//                                         <MdDelete /> Delete
//                                     </Button>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         <Form>
//                             <Row className="mb-3">
//                                 <Col md={3}><Form.Control placeholder="Company Name" value={newWorkExperience.companyName} onChange={(e) => setNewWorkExperience({ ...newWorkExperience, companyName: e.target.value })} /></Col>
//                                 <Col md={3}><Form.Control placeholder="Job Title" value={newWorkExperience.jobTitle} onChange={(e) => setNewWorkExperience({ ...newWorkExperience, jobTitle: e.target.value })} /></Col>
//                                 <Col md={3}><Form.Control placeholder="Location" value={newWorkExperience.location} onChange={(e) => setNewWorkExperience({ ...newWorkExperience, location: e.target.value })} /></Col>
//                             </Row>
//                             <Row className="mb-3">
//                                 <Col md={2}><Form.Control placeholder="Start Date" value={newWorkExperience.startDate} onChange={(e) => setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })} /></Col>
//                                 <Col md={2}><Form.Control placeholder="End Date" value={newWorkExperience.endDate} onChange={(e) => setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })} /></Col>
//                             </Row>
//                             <Button variant="primary" onClick={handleAddWorkExperience}><FaPlusCircle /> Add Work Experience</Button>
//                         </Form>
//                     </Card.Body>
//                 </Collapse>
//             </Card>
    
//                 {renderSection('languages', languageList, (lang) => (
//                     <ListGroup.Item key={lang.id} className="d-flex justify-content-between">
//                         <div>
//                             <h6>{lang.language}</h6>
//                             <small>{lang.proficiency}</small>
//                         </div>
//                         <div className="d-flex align-items-center">
//                             <Button variant="outline-primary" size="sm" className="me-2"><MdOutlineEdit /> Edit</Button>
//                             <Button variant="outline-danger" size="sm" onClick={() => setLanguageList(languageList.filter((l) => l.id !== lang.id))}>
//                                 <MdDelete /> Delete
//                             </Button>
//                         </div>
//                     </ListGroup.Item>
//                 ), (
//                     <Form>
//                         <Row className="mb-3">
//                             <Col md={6}><Form.Control placeholder="Language" value={newLanguage.language} onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })} /></Col>
//                             <Col md={6}><Form.Control placeholder="Proficiency" value={newLanguage.proficiency} onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })} /></Col>
//                         </Row>
//                         <Button variant="primary" onClick={handleAddLanguage}><FaPlusCircle /> Add Language</Button>
//                     </Form>
//                 ))}
//                   {/* Projects Section */}
//             <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('projects')}>
//                     <div className="d-flex align-items-center">
//                         <FaProjectDiagram className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Projects</h5>
//                     </div>
//                     <div>{expandedSections.projects ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.projects}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {projects.map((proj) => (
//                                 <ListGroup.Item key={proj.id} className="d-flex justify-content-between">
//                                     <div>
//                                         <h6>{proj.title}</h6>
//                                         <small>({proj.startDate} - {proj.endDate})</small>
//                                         <p className="text-muted">{proj.description || 'No description provided'}</p>
//                                     </div>
//                                     <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProject(proj.id)}>
//                                         <MdDelete /> Delete
//                                     </Button>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         <Form>
//                             <Row className="mb-3">
//                                 <Col md={4}><Form.Control placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} /></Col>
//                                 <Col md={4}><Form.Control placeholder="Start Year" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} /></Col>
//                                 <Col md={4}><Form.Control placeholder="End Year" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} /></Col>
//                             </Row>
//                             <Row>
//                                 <Col><Form.Control placeholder="Description (Optional)" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} /></Col>
//                             </Row>
//                             <Button variant="primary" onClick={handleAddProject} className="mt-3"><FaPlusCircle /> Add Project</Button>
//                         </Form>
//                     </Card.Body>
//                 </Collapse>
//             </Card>
//                  {/* Address Section */}
//             <Card className="mb-4 shadow-lg border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 cursor-pointer" onClick={() => toggleSection('addresses')}>
//                     <div className="d-flex align-items-center">
//                         <FaMapMarkerAlt className="me-2" style={{ fontSize: '1.5rem' }} />
//                         <h5 className="mb-0">Address</h5>
//                     </div>
//                     <div>{expandedSections.addresses ? <FaChevronUp /> : <FaChevronDown />}</div>
//                 </Card.Header>
//                 <Collapse in={expandedSections.addresses}>
//                     <Card.Body className="p-4">
//                         <ListGroup className="mb-3">
//                             {addresses.map((addr) => (
//                                 <ListGroup.Item key={addr.id} className="d-flex justify-content-between">
//                                     <div>
//                                         <h6>{addr.city}, {addr.state}, {addr.country} - {addr.postalCode}</h6>
//                                     </div>
//                                     <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAddress(addr.id)}>
//                                         <MdDelete /> Delete
//                                     </Button>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         <Form>
//                             <Row className="mb-3">
//                                 <Col md={4}><Form.Control placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} /></Col>
//                                 <Col md={4}><Form.Control placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} /></Col>
//                                 <Col md={4}><Form.Control placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} /></Col>
//                             </Row>
//                             <Row className="mb-3">
//                                 <Col md={4}><Form.Control placeholder="Postal Code" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} /></Col>
//                             </Row>
//                             <Button variant="primary" onClick={handleAddAddress}><FaPlusCircle /> Add Address</Button>
//                         </Form>
//                     </Card.Body>
//                 </Collapse>
//             </Card>

//             </Container>
//         );
//     }
// }
//  export default Home;
    


import React, { useEffect, useState } from 'react';
import SkillsSection from './SkillsSection'
import ProfileSection from './ProfileSection'
import EducationSection from './EducationSection'
import CertificateSection from './CertificateSection'
import WorkExperienceSection from './WorkExperienceSection'
import ProjectSection from './ProjectSection'
import LanguageSection from './LanguageSection'
import AddressSection from './AddressSection'

const Home = () => {
   const [userName, setUserName] = useState('');
      const [userEmail, setUserEmail] = useState('');

      // Fetch user details from localStorage
      useEffect(() => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              // setUserName(parsedUser.name);
              // setUserEmail(parsedUser.username);  
          }
      }, []);
  const userDetails = {
     name: userName,
     username: userEmail,
    // phone: '+123456789',
    // address: '123 Main St, City, Country',
    // jobTitle: 'Software Engineer',
    // expectedSalary: '100k',
    // summary: 'A highly motivated software engineer specializing in full-stack development.',
    // skills: 'JavaScript, React, Node.js, Python',
    // hobbies: 'Reading, Traveling, Coding',
  };

  return (
    <div>
        <ProfileSection userDetails={userDetails}/>
        <SkillsSection/>
        <EducationSection/>
        <CertificateSection/>
        <WorkExperienceSection/>
        <ProjectSection/>
        <LanguageSection/>
        <AddressSection/>
    </div>
  )
}

export default Home
