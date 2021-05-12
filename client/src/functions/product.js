import axios from "axios";

// Product
export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products/`, {
    sort,
    order,
    page,
  });

export const updateProduct = async (product, slug, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

// Category
export const getSubCategories = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);

// Ratings
export const rateProduct = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

// Ralated
export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
