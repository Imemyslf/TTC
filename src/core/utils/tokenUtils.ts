import { jwtDecode } from "jwt-decode"

interface DecodeToken {
    userId: number;
    name: string;
    exp: number;
    role: string;
}

export const decodeToken = (token: string) => {
    try { 
        return jwtDecode<DecodeToken>(token);
    } catch (err) {
        console.error("TokenDecodeError: ",err)
    }
}

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);

  if (!decoded) return true;

  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
};