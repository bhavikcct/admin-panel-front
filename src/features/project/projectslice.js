import { createSlice } from "@reduxjs/toolkit";
import { useAxios } from "@/utils/axios";
const initialState = {
    items: [],
    status: "idle",
    error: null,
};
const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        fetchProjectsStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchProjectsSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchProjectsFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        clearProjects: (state) => {
            state.items = [];
            state.status = "idle";
        },
    },
});
export const ProjectSlice = () => {
    const { axiosInstance } = useAxios();
    const fetchProjects = (search = "") => async (dispatch) => {
        try {
            dispatch(fetchProjectsStart());
            const res = await axiosInstance.get("/projects", {
                params: { search },
            });
            dispatch(fetchProjectsSuccess(res.data));
        }
        catch (error) {
            dispatch(fetchProjectsFailure(error.message || "Failed to fetch projects"));
        }
    };
    const createProject = (data) => async (dispatch) => {
        try {
            await axiosInstance.post("/projects", data);
            dispatch(fetchProjects());
        }
        catch (error) {
            console.error("Create project error", error);
        }
    };
    const updateProject = (id, data) => async (dispatch) => {
        try {
            await axiosInstance.put(`/projects/${id}`, data);
            dispatch(fetchProjects());
        }
        catch (error) {
            console.error("Update project error", error);
        }
    };
    const deleteProject = (id) => async (dispatch) => {
        try {
            await axiosInstance.delete(`/projects/${id}`);
            dispatch(fetchProjects());
        }
        catch (error) {
            console.error("Delete project error", error);
        }
    };
    const getSingleProject = (id) => async (dispatch) => {
        try {
            const response = await axiosInstance.get(`/projects/${id}`);
            return { payload: response.data };
        }
        catch (error) {
            console.error("Failed to get project", error);
            return { error };
        }
    };
    return {
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        getSingleProject
    };
};
export const { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure, clearProjects, } = projectsSlice.actions;
export default projectsSlice.reducer;
