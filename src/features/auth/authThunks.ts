// features/auth/authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  input: string;
  type: 'email' | 'phone';
  password?: string; // opsiyonel, eğer şifre istenirse
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', data);
      return response.data; // { user, accessToken, refreshToken }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', data);
      return response.data; // { user, accessToken, refreshToken }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Register failed');
    }
  }
);
