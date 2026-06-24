import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/orders";

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

export const placeOrder = async (orderData: any) => {
  return await axios.post(`${API_URL}/place`, orderData, getAuthHeaders());
};

export const getMyOrders = async () => {
  return await axios.get(`${API_URL}/my-orders`, getAuthHeaders());
};

export const cancelOrder = async (orderId: string) => {
  return await axios.put(`${API_URL}/cancel/${orderId}`, {}, getAuthHeaders());
};


export const downloadOrderInvoice = async (orderId: string) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/orders/${orderId}/invoice`, {
      headers: { 
        Authorization: `Bearer ${user.accessToken}` 
      },
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GreenMart_Invoice_${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading invoice:", error);
    alert("Invoice download failed!");
  }
};