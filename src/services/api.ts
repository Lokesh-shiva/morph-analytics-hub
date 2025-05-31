/**
 * API client for Morph Analytics Hub
 * Handles HTTP requests with authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v2',
  timeout: 10000,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Redirect to login or handle auth error
      window.location.href = '/auth';
    }
    
    return Promise.reject(error);
  }
);

// Generic API request wrapper
export const apiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Convenience methods for different HTTP verbs
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'GET', url }),

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    apiRequest<T>({ ...config, method: 'POST', url, data }),

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PUT', url, data }),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'DELETE', url }),
};

// Health check endpoint
export const healthCheck = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    return false;
  }
};

export default apiClient;