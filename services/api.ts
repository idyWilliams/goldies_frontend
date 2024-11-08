import axios from "axios";

console.log("Current NODE_ENV:", process.env.NODE_ENV);

export let BASEURL: string | undefined;
switch (process.env.NODE_ENV) {
  case "production":
    BASEURL = process.env.NEXT_PUBLIC_SERVER_HOST;
    console.log("Production Environment");
    break;
  default:
    BASEURL = process.env.NEXT_PUBLIC_SERVER_HOST;
    console.log("Development Environment");
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
    "x-access-token": accessToken,
    Token: `Bearer ${accessToken}`,
    Authorization: `Bearer ${accessToken}`,
  },
});

export default instance;
