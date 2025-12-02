import axios from 'axios';

// Use a static URL for development
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

// Store the original request in case we need to retry
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      isRefreshing = false;
      processQueue(error, null);
    }

    // Handle account lockout (423)
    if (error.response?.status === 423) {
      console.error('Account locked:', error.response.data.detail);
      alert('Your account has been temporarily locked due to too many failed login attempts. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Auth API - Using YOUR working /register and /login endpoints
export const authAPI = {
  // Register using YOUR backend structure
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login - sends JSON (not form data)
  login: async (credentials) => {
    try {
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password
      });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get current user profile
  getProfile: () => api.get('/me'),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Goals API - Using teammate's /goals/ endpoints
export const goalsAPI = {
  create: async (goalData) => {
    // goalData: { name, type, target_amount, current_amount, target_date }
    try {
      const response = await api.post('/goals/', goalData);
      return response;
    } catch (error) {
      console.error('Create goal error:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/goals/');
      return response;
    } catch (error) {
      console.error('Get goals error:', error);
      throw error;
    }
  },

  updateProgress: async (goalId, currentAmount) => {
    try {
      // Your teammate's endpoint expects current_amount as a query parameter
      const response = await api.patch(`/goals/${goalId}`, null, {
        params: { current_amount: currentAmount }
      });
      return response;
    } catch (error) {
      console.error('Update goal error:', error);
      throw error;
    }
  },

  delete: async (goalId) => {
    try {
      const response = await api.delete(`/goals/${goalId}`);
      return response;
    } catch (error) {
      console.error('Delete goal error:', error);
      throw error;
    }
  }
};

// Users API
export const usersAPI = {
  getCurrentUser: () => api.get('/users/me'),
  getById: (id) => api.get(`/users/${id}`),
  update: (updates) => api.put('/users/update', updates),
};

// Budgets API
export const budgetsAPI = {
  create: (budgetData) => api.post('/budgets/', budgetData),
  getAll: () => api.get('/budgets/'),
  getEntries: (budgetId) => api.get(`/budget-entries/${budgetId}`),
  addEntry: (entryData) => api.post('/budget-entries/', entryData),
};

// Transactions API
export const transactionsAPI = {
  create: (transactionData) => api.post('/transactions/', transactionData),
  getAll: () => api.get('/transactions/'),
  getByCategory: (categoryId) => api.get(`/transactions/by-category/${categoryId}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
};

// LLM API
export const llmAPI = {
  log: (logData) => api.post('/llm-logs/', logData),
  getLogs: () => api.get('/llm-logs/'),
};

// Profiles API
export const profilesAPI = {
  createOrUpdate: (profileData) => api.post('/profiles/', profileData),
  getMyProfile: () => api.get('/profiles/me'),
  delete: () => api.delete('/profiles/me'),
};

// Helper functions
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const getUserData = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

export const setAuthData = (token, userData) => {
  localStorage.setItem('access_token', token);
  localStorage.setItem('user_data', JSON.stringify(userData));
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Handle successful login/registration - matches YOUR backend response structure
export const handleAuthSuccess = (response) => {
  const { access_token, user_id, email, role_id } = response.data;
  
  setAuthData(access_token, {
    id: user_id,
    email: email,
    role_id: role_id
  });
  
  return response;
};

// Get user role name based on role_id
export const getUserRole = (role_id) => {
  // Based on your backend Roles table:
  // role_id 1 = 'user' (personal account)
  // role_id 2 = 'admin' (business account creator)
  // role_id 3 = 'sub_user' (business account member)
  const roleMap = {
    1: 'user',
    2: 'admin', 
    3: 'sub_user'
  };
  return roleMap[role_id] || 'user';
};

// Route users to appropriate dashboard based on role
export const getRedirectPath = (role_id) => {
  const role = getUserRole(role_id);
  
  switch(role) {
    case 'admin':
      return '/admin-dashboard'; // Business owner dashboard
    case 'sub_user':
      return '/sub-user-dashboard'; // Business member dashboard
    case 'user':
    default:
      return '/dashboard'; // Personal user dashboard
  }
};

export default api;