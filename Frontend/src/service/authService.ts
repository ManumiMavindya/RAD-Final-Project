import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/auth/";

export const registerUser = async (userData: any) => {
    return await axios.post(API_URL + "register", userData);
};

export const loginUser = async (credentials: any) => {
  const response = await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
  
  if (response.data && response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data.data;
  }
  throw new Error("Login failed");
};