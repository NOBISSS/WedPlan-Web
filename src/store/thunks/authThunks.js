import { BASE_URL } from "@/constants/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
BASE_URL
const authHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
});

//REGISTER STEP 1
export const registerWithOTP = createAsyncThunk(
    "auth/registerWithOTP",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, userData);
            return { ...res.data, email: userData.email };
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to send OTP");
        }
    });

//REGISTER STEP 2 - VERIFY OTP
export const vertifyRegisterOTP = createAsyncThunk(
    "auth/vertifyRegisterOTP",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/verify`, data);
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to verify OTP");
        }
    })

//login with email otp step 1
export const loginWithEmailOTP = createAsyncThunk(
    "auth/loginWithEmailOTP",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/loginwithemail`, data);
            return { ...res.data, email: data.email };
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to send OTP");
        }
    });

//login with email otp step 2
export const verifyLoginOTP = createAsyncThunk(
    "auth/verifyLoginOTP",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/verifyloginotp`, data);
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to verify OTP");
        }
    });


//login with password
export const loginWithPassword = createAsyncThunk(
    "auth/loginWithPassword",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/loginwithpassword`, data);
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to login");
        }
    });

//forgot password step 1 - send otp
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/forgotpassword`, data);
            return { ...res.data, email: data.email };
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to send OTP");
        }
    });

//forgot password step 2
export const verifyForgotPasswordOTP = createAsyncThunk(
    "auth/verifyForgotPasswordOTP",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/verifyforgotpasswordotp`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to verify OTP");
        }
    });

//forgot password step 3 - reset password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/resetpassword`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to reset password");
        }
    });

export const resentOTP = createAsyncThunk(
    "auth/resendOTP",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/resend`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to resend OTP");
        }
    });

//get me
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}/auth/me`, authHeader(token));
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch user data");
        }
    });

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${BASE_URL}/auth/logout`, {}, authHeader(token));
            localStorage.removeItem("token");
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to logout");
        }
    });
