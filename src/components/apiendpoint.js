const API_BASE_URL = 'http://13.232.80.171:8080/JOBASSIST/JOBASSIST';

const apiEndpoints = {
    auth: {
        login: `${API_BASE_URL}/public/login`,
        register: `${API_BASE_URL}/public/signup`,
    },
    jobs: {
        getAllJobs: `${API_BASE_URL}/public/getAllJobs`,
        searchJobs: (keyword) => `${API_BASE_URL}/public/search/?keyword=${keyword}`,
    },
    users: {
        getUserDetails: `${API_BASE_URL}/private/getUserDetails`,
    },
    address: {
        add: `${API_BASE_URL}/private/addAddress`,
        get: (id) => `${API_BASE_URL}/private/getAddress/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateAddress/${id}`,
    },
    certification: {
        add: `${API_BASE_URL}/private/addCertification`,
        get: (id) => `${API_BASE_URL}/private/getCertification/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateCertification/${id}`,
        delete: (id) => `${API_BASE_URL}/private/deleteCertification/${id}`,
        getAll: `${API_BASE_URL}/private/getAllCertification`,
    },
    education: {
        add: `${API_BASE_URL}/private/addEducation`,
        get: (id) => `${API_BASE_URL}/private/getEducation/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateEducation/${id}`,
        delete: (id) => `${API_BASE_URL}/private/deleteEducation/${id}`,
        getAll: `${API_BASE_URL}/private/getAllEducation`,
    },
    project: {
        add: `${API_BASE_URL}/private/addProject`,
        get: (id) => `${API_BASE_URL}/private/getProject/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateProject/${id}`,
        delete: (id) => `${API_BASE_URL}/private/deleteProject/${id}`,
        getAll: `${API_BASE_URL}/private/getAllProject`,
    },
    skills: {
        add: `${API_BASE_URL}/private/addSkills`,
        get: (id) => `${API_BASE_URL}/private/getSkills/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateSkills/${id}`,
        delete: (id) => `${API_BASE_URL}/private/deleteSkills/${id}`,
        getAll: `${API_BASE_URL}/private/getAllUserSkill`,
    },
    workExperience: {
        add: `${API_BASE_URL}/private/addWork-experience`,
        get: (id) => `${API_BASE_URL}/private/getWork-experience/${id}`,
        update: (id) => `${API_BASE_URL}/private/updateWork-experience/${id}`,
        delete: (id) => `${API_BASE_URL}/private/deleteWork-experience/${id}`,
        getAll: `${API_BASE_URL}/private/getAllWorkExperience`,
    },
};

export default apiEndpoints;
