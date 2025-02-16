import axios from 'axios';
import apiEndpoints from './apiendpoint';

const API_BASE_URL = 'http://13.232.80.171:8080/JOBASSIST';

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the token from localStorage
const getAuthToken = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData,"userdata jdkwshf");
    return userData?.jwtToken || null;
};

// Function to get authorization headers
const getAuthHeaders = () => {
    const token = getAuthToken();
    console.log(token,"token jdkwshf")
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// API Service with authentication
const apiService = {
    get: async (url, config = {}) => {
        try {
            const response = await apiClient.get(url, {
                ...config,
                headers: {
                    ...config.headers,
                    ...getAuthHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    },

    post: async (url, data, config = {}) => {
        try {
            const response = await apiClient.post(url, data, {
                ...config,
                headers: {
                    ...config.headers,
                    ...getAuthHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    },

    put: async (url, data, config = {}) => {
        try {
            const response = await apiClient.put(url, data, {
                ...config,
                headers: {
                    ...config.headers,
                    ...getAuthHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    },

    delete: async (url, config = {}) => {
        try {
            const response = await apiClient.delete(url, {
                ...config,
                headers: {
                    ...config.headers,
                    ...getAuthHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    },
};

export { apiClient, apiService };
