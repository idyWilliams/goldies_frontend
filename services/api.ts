import axios from "axios";

console.log("Current NODE_ENV:", process.env.NODE_ENV);

export let BASEURL: string | undefined;
switch (process.env.NODE_ENV) {
  case "production":
    BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("Production Environment");
    break;
  default:
    BASEURL = process.env.NEXT_PUBLIC_SERVER_HOST;
    console.log("Development Environment");
    break;
}

export const ImageStorageUrl = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_API;
let accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGIxOTE4YjIxYWY3NjMxNWNhODU1MCIsImlhdCI6MTcyNTY0MjcxMSwiZXhwIjoxNzI1NzI5MTExfQ.7aKMMqv3F6vXOkWffLnniD4KGF5KIoTkSZgV98i7kN0";

// if (typeof window !== "undefined") {
//   accessToken = localStorage.getItem("accessToken") || "";
// }

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
// @ts-ignore
