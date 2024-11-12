import axios from "axios";

console.log("Current NODE_ENV:", process.env.NODE_ENV);

export let BASEURL: string | undefined;
switch (process.env.NODE_ENV) {
  case "production":
    BASEURL = process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL;
    console.log("Production Environment:", BASEURL);
    break;
  default:
    BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("Development Environment", BASEURL);
    break;
}

export const ImageStorageUrl = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API;
let accessToken;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") || "";
}

const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-type": "application/json",
    // "x-access-token": accessToken,
    // Token: `Bearer ${accessToken}`,
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

// Optional: Log Axios instance configuration for debugging
console.log("Axios Instance Configuration:", {
  baseURL: BASEURL,
  headers: instance.defaults.headers,
});

export default instance;
