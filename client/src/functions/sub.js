import axios from "axios";
const apiUrl = process.env.REACT_APP_API;

export const getSubs = async () => {
  return await axios.get(`${apiUrl}/subs`);
};

export const getSub = async (slug) => {
  return await axios.get(`${apiUrl}/sub/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (authtoken, slug, sub) => {
  return await axios.put(`${apiUrl}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
};
export const createSub = async (authtoken, sub) => {
  return await axios.post(`${apiUrl}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
};
