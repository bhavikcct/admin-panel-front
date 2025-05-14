import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";
import { useAxios } from "@/utils/axios";

export interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectsState {
  items: Project[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectsState = {
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
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
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

  const fetchProjects =
    (search: string = "") =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(fetchProjectsStart());
        const res = await axiosInstance.get("/projects", {
          params: { search },
        });
        dispatch(fetchProjectsSuccess(res.data));
      } catch (error: any) {
        dispatch(
          fetchProjectsFailure(error.message || "Failed to fetch projects")
        );
      }
    };
  const createProject =
    (data: { name: string; description?: string }) =>
    async (dispatch: AppDispatch) => {
      try {
        await axiosInstance.post("/projects", data);
        dispatch(fetchProjects()); 
      } catch (error) {
        console.error("Create project error", error);
      }
    };

  const updateProject =
    (id: number, data: { name: string; description?: string }) =>
    async (dispatch: AppDispatch) => {
      try {
        await axiosInstance.put(`/projects/${id}`, data);
        dispatch(fetchProjects());
      } catch (error) {
        console.error("Update project error", error);
      }
    };

  const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
    try {
      await axiosInstance.delete(`/projects/${id}`);
      dispatch(fetchProjects()); 
    } catch (error) {
      console.error("Delete project error", error);
    }
  };
  const getSingleProject = (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      return { payload: response.data };
    } catch (error) {
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

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  clearProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
