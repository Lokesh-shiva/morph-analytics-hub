/**
 * Authentication service for Morph Analytics Hub
 * Handles login, logout, and authentication state
 */

import { api } from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  email?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user?: User;
}

class AuthService {
  /**
   * Login with username and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await api.post<AuthResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error);
    }
  }

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/users/me');
      return response;
    } catch (error) {
      throw new Error('Failed to get user information');
    }
  }

  /**
   * Check authentication status
   */
  async checkAuthStatus(): Promise<AuthStatus> {
    try {
      const user = await this.getCurrentUser();
      return {
        isAuthenticated: true,
        user,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
      };
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<void> {
    try {
      await api.post('/auth/refresh');
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }
}

export const authService = new AuthService();
export default authService;