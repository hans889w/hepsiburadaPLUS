// features/auth/authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';
export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/login', data);
        return response.data; // { user, accessToken, refreshToken }
    }
    catch (error) {
        return rejectWithValue(error.response?.data || 'Login failed');
    }
});
export const registerUser = createAsyncThunk('auth/registerUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/register', data);
        return response.data; // { user, accessToken, refreshToken }
    }
    catch (error) {
        return rejectWithValue(error.response?.data || 'Register failed');
    }
});
