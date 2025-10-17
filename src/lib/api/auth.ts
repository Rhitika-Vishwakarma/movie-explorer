import { LoginData, RegisterData, AuthResponse } from '@/types/user';

const API_BASE = '/api/auth';

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  logout: async (token: string): Promise<void> => {
    await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};