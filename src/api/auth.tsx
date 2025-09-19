// Fake API call (replace with fetch/axios later)
export const loginApi = async (email: string, password: string) => {
  if (email === "admin@gmail.com" && password === "12345") {
    return { token: "fake-jwt-token" };
  } else {
    throw new Error("Invalid credentials");
  }
};