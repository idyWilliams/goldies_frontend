import axios from "axios";

export const BASEURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;


// Firebase storage URL
export const ImageStorageUrl = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API;

const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// 🔹 Interceptor: Always get the latest token before requests
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const isAdmin =
      window.location.pathname.startsWith("/admin/") ||
      window.location.pathname === "/admin";

    // Retrieve token dynamically
    const accessToken = isAdmin
      ? localStorage.getItem("adminToken") || ""
      : localStorage.getItem("userToken") || "";

    // Attach the token to headers dynamically
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }
  return config;
});

// Optional: Log Axios instance configuration for debugging
console.log("Axios Instance Configuration:", {
  baseURL: BASEURL,
  headers: instance.defaults.headers,
});

export default instance;
