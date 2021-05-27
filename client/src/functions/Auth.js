import axios from "axios";
const apiUrl = process.env.REACT_APP_API;

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${apiUrl}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.get(`${apiUrl}/current-user`, {
    headers: {
      authtoken,
    },
  });
};
export const currentAdmin = async (authtoken) => {
  return await axios.get(`${apiUrl}/current-admin`, {
    headers: {
      authtoken,
    },
  });
};
