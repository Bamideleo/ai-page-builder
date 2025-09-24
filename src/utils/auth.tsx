export const isAuthenticated = () => !!localStorage.getItem("token");

export const setToken = (token: string) => localStorage.setItem("token", token);

export const setUserData = (data: object) => localStorage.setItem("data", JSON.stringify(data));

export const isUserDetails = () => {
    const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : null;
};

export const setWithExpiry = () => {
    const ttl = 24 * 60 * 60 * 1000;
    
    const now = new Date();

  const item = now.getTime() + ttl; // now + 24hrs
  localStorage.setItem('expiry', JSON.stringify(item));
}


// Auto purge expired items
export const startAutoPurge = () => {
  setInterval(() => {
   const itemStr = localStorage.getItem('expiry');   
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.clear(); // expired → remove
    return null;
  }

//   return item.value;
  }, 60 * 1000); // run every 1 min
};

export const logout = () => localStorage.clear();