import { createSlice } from "@reduxjs/toolkit";
import { useAxios } from "@/utils/axios";
const initialState = {
    items: [],
    status: "idle",
    error: null,
};
const estimationSlice = createSlice({
    name: "estimations",
    initialState,
    reducers: {
        fetchEstimationsStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchEstimationsSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchEstimationsFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        clearEstimations: (state) => {
            state.items = [];
            state.status = "idle";
        },
    },
});
export const EstimationActions = () => {
    const { axiosInstance } = useAxios();
    const fetchEstimations = () => async (dispatch) => {
        try {
            dispatch(fetchEstimationsStart());
            const response = await axiosInstance.get("/estimation");
            dispatch(fetchEstimationsSuccess(response.data));
        }
        catch (error) {
            dispatch(fetchEstimationsFailure(error.message || "Failed to fetch estimations"));
        }
    };
    const createEstimation = (data) => async (dispatch) => {
        try {
            await axiosInstance.post("/estimation", data);
            dispatch(fetchEstimations());
        }
        catch (error) {
            console.error("Create estimation error", error);
        }
    };
    const updateEstimation = (id, data) => async (dispatch) => {
        try {
            await axiosInstance.put(`/estimation/${id}`, data);
            dispatch(fetchEstimations());
        }
        catch (error) {
            console.error("Update estimation error", error);
        }
    };
    const deleteEstimation = (id) => async (dispatch) => {
        try {
            await axiosInstance.delete(`/estimation/${id}`);
            dispatch(fetchEstimations());
        }
        catch (error) {
            console.error("Delete estimation error", error);
        }
    };
    const getSingleEstimation = (id) => async () => {
        try {
            const response = await axiosInstance.get(`/estimation/${id}`);
            return { payload: response.data };
        }
        catch (error) {
            console.error("Failed to get estimation", error);
            return { error };
        }
    };
    return {
        fetchEstimations,
        createEstimation,
        updateEstimation,
        deleteEstimation,
        getSingleEstimation,
    };
};
export const { fetchEstimationsStart, fetchEstimationsSuccess, fetchEstimationsFailure, clearEstimations, } = estimationSlice.actions;
export default estimationSlice.reducer;
