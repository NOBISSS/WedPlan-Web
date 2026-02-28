import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, getMe, loginWithEmailOTP, loginWithPassword, logoutUser, registerWithOTP, resetPassword, resendOTP, verifyForgotPasswordOTP, verifyLoginOTP, vertifyRegisterOTP } from "../thunks/authThunks";


const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,

    //OTP
    otpSent: false,
    otpVerified: false,
    pendingEmail: null,

    //forgot-passwod
    forgotPasswordStep: null,

    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearOTPState: (state) => {
            state.otpSent = false;
            state.otpVerified = false;
            state.pendingEmail = null;
        },
        clearForgotPassword: (state) => {
            state.forgotPasswordStep = null;
        },
        setPendingEmail: (state, action) => {
            state.pendingEmail = action.payload;
        }
    },
    extraReducers: (builder) => {
        //---REGISTER STEP 1 - SEND OTP
        builder
            .addCase(registerWithOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerWithOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.pendingEmail = action.payload.email;
            })
            .addCase(registerWithOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send OTP";
            })
        builder
            .addCase(vertifyRegisterOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(vertifyRegisterOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.otpVerified = true;
                state.otpSent = false;
                state.pendingEmail = null;
            })
            .addCase(vertifyRegisterOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to verify OTP";
            })

        //login
        builder
            .addCase(loginWithEmailOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithEmailOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.pendingEmail = action.payload.email;
            })
            .addCase(loginWithEmailOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send OTP";
            })

        //login with email otp step 2
        builder
            .addCase(verifyLoginOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyLoginOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.otpVerified = true;
                state.otpSent = false;
                state.pendingEmail = null;
            })
            .addCase(verifyLoginOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to verify OTP";
            })

        //login with password
        builder
            .addCase(loginWithPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginWithPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

        //forgot password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.forgotPasswordStep = "otp_sent";
                state.pendingEmail = action.payload.email;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send forgot password email";
            })

        //forgot password
        builder
            .addCase(verifyForgotPasswordOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.forgotPasswordStep = "otp_verified";
            })
            .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to verify OTP";
            })

        //forgot password -Reset
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.forgotPasswordStep = null;
                state.pendingEmail = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to reset password";
            })

        //RESEND OTP
        builder
            .addCase(resendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to resend OTP";
            })

        //get me
        builder
            .addCase(getMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload || "Failed to get user details";
            })

        //logout
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.otpSent = false;
                state.otpVerified = false;
                state.pendingEmail = null;
            })
    },
});

export const { clearError,clearOTPState,clearForgotPassword,setPendingEmail } = authSlice.actions;
export default authSlice.reducer;