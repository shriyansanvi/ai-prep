import axios from 'axios';

// This is the URL where your Node.js server is running
const API_URL = 'http://localhost:5000/api/roadmap';

export const generateRoadmap = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/generate`, userData);
        return response.data;
    } catch (error) {
        console.error("Error fetching roadmap:", error);
        throw error;
    }
};