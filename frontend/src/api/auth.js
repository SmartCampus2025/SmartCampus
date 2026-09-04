import client from './client';

export const loginUser = async (credentials) => {
  const response = await client.post('/auth/login', credentials);
  if (response.data && response.data.token) {
    localStorage.setItem('smartcampus_token', response.data.token);
    if (response.data.user) {
      localStorage.setItem('smartcampus_user', JSON.stringify(response.data.user));
    }
  }
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await client.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('smartcampus_token');
  localStorage.removeItem('smartcampus_user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('smartcampus_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};
