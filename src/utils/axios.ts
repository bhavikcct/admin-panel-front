// src/hooks/useAxios.ts
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAxios = () => {
   const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL!,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - token may be expired");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return {
    axiosInstance
  };
};

