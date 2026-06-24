import axios from 'axios';

// Backend එකේ API URL එක
const API_URL = "http://localhost:5000/api/v1/orders";

// Token එක අරන් යනවා (Auth වෙලා ඉන්න User ගේ)
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("User Object from localStorage:", user); 
  console.log("Token being sent:", user.accessToken);

  if (!user.accessToken) {
    throw new Error("No access token found! Please login again.");
  }
  
  return {
    headers: { 
      Authorization: `Bearer ${user.accessToken}` 
    }
  };
};

// ඕඩර් එකක් දාන්න
export const placeOrder = async (orderData: any) => {
  return await axios.post(`${API_URL}/place`, orderData, getAuthHeaders());
};

// තමන්ගේ ඕඩර්ස් ටික ගන්න
export const getMyOrders = async () => {
  return await axios.get(`${API_URL}/my-orders`, getAuthHeaders());
};

// ඕඩර් එකක් cancel කරන්න
export const cancelOrder = async (orderId: string) => {
  return await axios.put(`${API_URL}/cancel/${orderId}`, {}, getAuthHeaders());
};