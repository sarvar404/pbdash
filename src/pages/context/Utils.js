// localStorageUtils.js
export const getStoredUserData = (KEY) => {
    const storedUserData = JSON.parse(localStorage.getItem(KEY));
    return storedUserData;
  };
  
  export const setUserData = (userData, KEY) => {
    localStorage.setItem(KEY, JSON.stringify(userData));
  };
  
  export const logoutMe = (KEY) => {
    localStorage.removeItem(KEY);
  };
  