import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";
import { useAxios } from "@/utils/axios";

export interface EstimationItem {
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
}

export interface EstimationSection {
  sectionName: string;
  items: EstimationItem[];
}

export interface Estimation {
  id: number;
  sections: EstimationSection[];
  total: number;
  totalMargin: number;
  createdAt: string;
}

interface EstimationState {
  items: Estimation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EstimationState = {
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
    fetchEstimationsSuccess: (state, action: PayloadAction<Estimation[]>) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    fetchEstimationsFailure: (state, action: PayloadAction<string>) => {
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

  const fetchEstimations =
    () => async (dispatch: AppDispatch) => {
      try {
        dispatch(fetchEstimationsStart());
        const response = await axiosInstance.get("/estimation");
        dispatch(fetchEstimationsSuccess(response.data));
      } catch (error: any) {
        dispatch(
          fetchEstimationsFailure(error.message || "Failed to fetch estimations")
        );
      }
    };

  const createEstimation =
    (data: { sections: any }) =>
    async (dispatch: AppDispatch) => {
      try {
        await axiosInstance.post("/estimation", data);
        dispatch(fetchEstimations());
      } catch (error) {
        console.error("Create estimation error", error);
      }
    };

  const updateEstimation =
    (id: number, data: { sections:any }) =>
    async (dispatch: AppDispatch) => {
      try {
        await axiosInstance.put(`/estimation/${id}`, data);
        dispatch(fetchEstimations());
      } catch (error) {
        console.error("Update estimation error", error);
      }
    };

  const deleteEstimation = (id: number) => async (dispatch: AppDispatch) => {
    try {
      await axiosInstance.delete(`/estimation/${id}`);
      dispatch(fetchEstimations());
    } catch (error) {
      console.error("Delete estimation error", error);
    }
  };

  const getSingleEstimation = (id: number) => async () => {
    try {
      const response = await axiosInstance.get(`/estimation/${id}`);
      return { payload: response.data };
    } catch (error) {
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

export const {
  fetchEstimationsStart,
  fetchEstimationsSuccess,
  fetchEstimationsFailure,
  clearEstimations,
} = estimationSlice.actions;

export default estimationSlice.reducer;
