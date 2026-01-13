import jwtDecode from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = () => {
  const decoded = decodeToken();
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
};
