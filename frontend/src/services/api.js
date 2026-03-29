import axios from 'axios';

const api = axios.create();

export const initApi = async () => {
  try {
    const response = await fetch('/config.json');
    if (response.ok) {
      const config = await response.json();
      api.defaults.baseURL = config.VITE_API_URL || import.meta.env.VITE_API_URL;
    } else {
      api.defaults.baseURL = import.meta.env.VITE_API_URL;
    }
  } catch (err) {
    console.error('Failed to load config.json', err);
    api.defaults.baseURL = import.meta.env.VITE_API_URL;
  }
};

export const taskService = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;  // Note: NoContent doesn't return data, handle gracefully if needed
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};

export default api;
