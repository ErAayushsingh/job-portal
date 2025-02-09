import axios from 'axios';

const API_BASE_URL = 'http://43.204.212.58:8080/JOBASSIST/JOBASSIST';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Handle all requests with proper error handling
const apiService = {
    get: async (url, config = {}) => {
        try {
            const response = await apiClient.get(url, config);
            return response.data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    },

    post: async (url, data, config = {}) => {
        try {
            const response = await apiClient.post(url, data, config);
            return response.data;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    },

    put: async (url, data, config = {}) => {
        try {
            const response = await apiClient.put(url, data, config);
            return response.data;
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    },

    delete: async (url, config = {}) => {
        try {
            const response = await apiClient.delete(url, config);
            return response.data;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    },
};

export default apiService;

