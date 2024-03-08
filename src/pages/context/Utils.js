import axios from 'axios';

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

export const fetchUserData = (token) => {
  const headers = {
    'x-security-header': '6571819fae1ec44369082bf3',
    authorization: `Bearer ${token}`,
  };

  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/user/get-user`, { headers })
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error);
    })
    .catch((error) => {
      throw new Error(`Error fetching user data: ${error.message}`);
    });
};

