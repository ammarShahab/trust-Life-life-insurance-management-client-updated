import axios from "axios";
import useAuth from "./useAuth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://b11a12-server-side-ammar-shahab.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          logOut().catch((err) => console.error("Logout error", err));
        }
        return Promise.reject(error);
      },
    );

    // Eject on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
