const API_BASE_URL = 'http://13.232.80.171:8080/JOBASSIST';
const PRIVATE_BASE_URL = `${API_BASE_URL}/private`;

const apiEndpoints = {
    auth: {
        login: `${API_BASE_URL}/public/login`,
        register: `${API_BASE_URL}/public/signup`,
    },
    jobs: {
        getAllJobs: `${API_BASE_URL}/public/getAllJobs`,
        searchJobs: (keyword) => `${API_BASE_URL}/public/search?keyword=${keyword}`,
    },
    user: {
        details: `${PRIVATE_BASE_URL}/getUserDetails`,  // Fetch all user details
    },
    profile: {
        address: {
            add: `${PRIVATE_BASE_URL}/addAddress`,
            get: `${PRIVATE_BASE_URL}/getAddress`,  
            update: `${PRIVATE_BASE_URL}/updateAddress`,
        },
        certification: {
            add: `${PRIVATE_BASE_URL}/addCertification`,
            get: (id) => `${PRIVATE_BASE_URL}/getCertification/${id}`,
            update: (id) => `${PRIVATE_BASE_URL}/updateCertification/${id}`,
            delete: (id) => `${PRIVATE_BASE_URL}/deleteCertification/${id}`,
            getAll: `${PRIVATE_BASE_URL}/getAllCertification`,
        },
        education: {
            add: `${PRIVATE_BASE_URL}/addEducation`,
            get: (id) => `${PRIVATE_BASE_URL}/getEducation/${id}`,
            update: (id) => `${PRIVATE_BASE_URL}/updateEducation/${id}`,
            delete: (id) => `${PRIVATE_BASE_URL}/deleteEducation/${id}`,
            getAll: `${PRIVATE_BASE_URL}/getAllEducation`,
        },
        project: {
            add: `${PRIVATE_BASE_URL}/addProject`,
            get: (id) => `${PRIVATE_BASE_URL}/getProject/${id}`,
            update: (id) => `${PRIVATE_BASE_URL}/updateProject/${id}`,
            delete: (id) => `${PRIVATE_BASE_URL}/deleteProject/${id}`,
            getAll: `${PRIVATE_BASE_URL}/getAllProject`,
        },
        skills: {
            add: `${PRIVATE_BASE_URL}/addSkills`,
            get: (id) => `${PRIVATE_BASE_URL}/getSkills/${id}`,
            update: (id) => `${PRIVATE_BASE_URL}/updateSkills/${id}`,
            delete: (id) => `${PRIVATE_BASE_URL}/deleteSkills/${id}`,
            getAll: `${PRIVATE_BASE_URL}/getAllUserSkill`,
        },
        workExperience: {
            add: `${PRIVATE_BASE_URL}/addWork-experience`,
            get: (id) => `${PRIVATE_BASE_URL}/getWork-experience/${id}`,
            update: (id) => `${PRIVATE_BASE_URL}/updateWork-experience/${id}`,
            delete: (id) => `${PRIVATE_BASE_URL}/deleteWork-experience/${id}`,
            getAll: `${PRIVATE_BASE_URL}/getAllWorkExperience`,
        },
    },
};

export default apiEndpoints;
