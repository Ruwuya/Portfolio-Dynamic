import axios from 'axios';

// Connects to PHP backend

const BASE_URL = "http://portfolio-backend.api";

export const getProjects = async () => {
    const response = await axios.get(`${BASE_URL}/projects.php`);
    return response.data;
};

export const sendMessage = async (formData) => {
    const response = await axios.post(`${BASE_URL}/addMessage.php`, formData);
    return response.data;
};