import axios from 'axios';

// Configuration de base pour axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs globales
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs d'authentification (401)
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion ou effacer le token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'API
export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await API.post('/users/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await API.post('/users/register', userData);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  updateProfile: async (userData: any) => {
    try {
      const response = await API.put('/users/profile', userData);
      // Mise à jour des données utilisateur dans le localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, ...response.data }));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await API.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getProductById: async (id: string) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getProductsByCategory: async (categoryId: string) => {
    try {
      const response = await API.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getBestsellers: async () => {
    try {
      const response = await API.get('/products/bestsellers');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await API.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCategoryById: async (id: string) => {
    try {
      const response = await API.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getTopCategories: async () => {
    try {
      const response = await API.get('/categories/top');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const CartService = {
  getCart: async (userId: string) => {
    try {
      const response = await API.get(`/carts/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  addToCart: async (cartId: string, productId: string, quantity: number = 1) => {
    try {
      const response = await API.post(`/carts/${cartId}/items`, { productId, quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateCartItem: async (cartId: string, itemId: string, quantity: number) => {
    try {
      const response = await API.put(`/carts/${cartId}/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  removeCartItem: async (cartId: string, itemId: string) => {
    try {
      const response = await API.delete(`/carts/${cartId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  clearCart: async (cartId: string) => {
    try {
      const response = await API.delete(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCartTotal: async (cartId: string) => {
    try {
      const response = await API.get(`/carts/${cartId}/total`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const OrderService = {
  createOrder: async (orderData: any) => {
    try {
      const response = await API.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getUserOrders: async (userId: string) => {
    try {
      const response = await API.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getOrderById: async (id: string) => {
    try {
      const response = await API.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  processPayment: async (orderId: string, paymentData: any) => {
    try {
      const response = await API.post(`/orders/${orderId}/payment`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default API;
