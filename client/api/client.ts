import { ApiResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Client API pour communiquer avec notre backend REST
 */
export const apiClient = {
  /**
   * Requête GET
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Une erreur est survenue',
          status: response.status
        };
      }
      
      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      console.error('API client error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur réseau est survenue',
        status: 500
      };
    }
  },

  /**
   * Requête POST
   */
  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Une erreur est survenue',
          status: response.status
        };
      }
      
      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      console.error('API client error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur réseau est survenue',
        status: 500
      };
    }
  },

  /**
   * Requête PUT
   */
  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Une erreur est survenue',
          status: response.status
        };
      }
      
      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      console.error('API client error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur réseau est survenue',
        status: 500
      };
    }
  },

  /**
   * Requête DELETE
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        }
      });
      
      if (response.status === 204) { // No content
        return {
          success: true,
          status: response.status
        };
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Une erreur est survenue',
          status: response.status
        };
      }
      
      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      console.error('API client error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur réseau est survenue',
        status: 500
      };
    }
  }
};
