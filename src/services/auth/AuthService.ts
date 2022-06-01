export const TOKEN_KEY = "@campus-token";
export const TOKEN_EMAIL = "@campus-email";
export const TOKEN_ID = "@campus-id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;  

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(TOKEN_ID);

export const login = (token: any, email: any, id: any) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EMAIL, email);
  localStorage.setItem(TOKEN_ID, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EMAIL);  
  localStorage.removeItem(TOKEN_ID);  
};