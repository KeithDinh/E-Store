import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products`);
};

export const getCategorySubs = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
};