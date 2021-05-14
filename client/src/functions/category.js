import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const getCategories = async () => {
  return await axios.get(`${apiUrl}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${apiUrl}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (authtoken, slug, category) => {
  return await axios.put(`${apiUrl}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const createCategory = async (authtoken, category) => {
  return await axios.post(`${apiUrl}/category`, category, {
    headers: {
      authtoken,
    },
  });
};
