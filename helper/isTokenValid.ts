import { jwtDecode, JwtPayload } from "jwt-decode";

interface ResetPasswordTokenPayload extends JwtPayload {
  exp?: number;
}

export const isTokenValid = (token: string | null) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode<ResetPasswordTokenPayload>(token);
    const currentTime: number = Math.floor(Date.now() / 1000);

    const isExpired =
      decodedToken.exp !== undefined && decodedToken.exp < currentTime;
    return isExpired;
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
};
