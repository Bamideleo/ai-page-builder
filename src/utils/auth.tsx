export const isAuthenticated = () => !!localStorage.getItem("token");

export const setToken = (token: string) => localStorage.setItem("token", token);

export const logout = () => localStorage.removeItem("token");