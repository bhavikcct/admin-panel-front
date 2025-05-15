import { useAxios } from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    status: "idle",
    error: null,
    token: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
        registerUser: (state, action) => {
            state.status = "loading";
            state.error = null;
        },
        registerUserSuccess: (state, action) => {
            state.status = "succeeded";
            // state.user = action.payload;
        },
        registerUserFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        loginUser: (state) => {
            state.status = "loading";
            state.error = null;
        },
        loginUserSuccess: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        loginUserFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        forgotpassworduser: (state) => {
            state.status = "loading";
            state.error = null;
        },
        forgotpasswordsuccess: (state, action) => {
            state.status = "succeeded";
            // state.user = action.payload;
        },
        forgotpasswordfailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        resetpassworduser: (state) => {
            state.status = "loading";
            state.error = null;
        },
        resetpasswordusersuccess: (state, action) => {
            state.status = "succeeded";
            // state.user = action.payload;
        },
        resetpassworduserfailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});
export const AuthSlice = () => {
    const { axiosInstance } = useAxios();
    const registerthunk = (userData) => async (dispatch) => {
        try {
            dispatch(registerUser(""));
            const response = await axiosInstance.post("/auth/register", userData);
            dispatch(registerUserSuccess(response.data));
            return response.data;
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                dispatch(registerUserFailure(error.message || "Registration failed"));
            }
            throw error;
        }
    };
    const loginThunk = (userData) => async (dispatch) => {
        try {
            dispatch(loginUser());
            const response = await axiosInstance.post("/auth/login", userData);
            dispatch(loginUserSuccess(response.data));
            return response.data;
        }
        catch (error) {
            dispatch(loginUserFailure(error.response?.data?.message || "Login failed"));
            throw error;
        }
    };
    const frogotpasswordthunk = (userData) => async (dispatch) => {
        try {
            dispatch(forgotpassworduser());
            const response = await axiosInstance.post("/auth/forgot-password", userData);
            dispatch(forgotpasswordsuccess(response.data));
            return response.data;
        }
        catch (error) {
            dispatch(forgotpasswordfailure(error.response?.data?.message || "Login failed"));
            throw error;
        }
    };
    const resetpasswordthunk = (userData) => async (dispatch) => {
        try {
            dispatch(resetpassworduser());
            const response = await axiosInstance.post("/auth/reset-password", userData);
            dispatch(resetpasswordusersuccess(response.data));
            return response.data;
        }
        catch (error) {
            dispatch(resetpassworduserfailure(error.response?.data?.message || "Login failed"));
            throw error;
        }
    };
    return {
        registerthunk,
        loginThunk,
        frogotpasswordthunk,
        resetpasswordthunk
    };
};
export default authSlice.reducer;
export const { logout, registerUser, registerUserSuccess, registerUserFailure, loginUser, loginUserSuccess, loginUserFailure, setToken, forgotpassworduser, forgotpasswordsuccess, forgotpasswordfailure, resetpassworduser, resetpassworduserfailure, resetpasswordusersuccess } = authSlice.actions;
export const selectAuth = (state) => state.auth;
