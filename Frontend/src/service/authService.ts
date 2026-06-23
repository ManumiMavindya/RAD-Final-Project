import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/auth/";

export const registerUser = async (userData: any) => {
    return await axios.post(API_URL + "register", userData);
};

export const loginUser = async (userData: any) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};