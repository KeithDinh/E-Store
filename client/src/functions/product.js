import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

// Product
export const createProduct = async (product, authtoken) => {
  return await axios.post(`${apiUrl}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${apiUrl}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) =>
  await axios.get(`${apiUrl}/product/${slug}`);

export const getProductsByCount = async (count) =>
  await axios.get(`${apiUrl}/products/${count}`);

export const getProductsByCategory = async (slug) =>
  await axios.get(`${apiUrl}/products/category/${slug}`);

export const getProductsBySub = async (slug) =>
  await axios.get(`${apiUrl}/products/subcategory/${slug}`);

export const getProductsByFilter = async (query) =>
  await axios.post(`${apiUrl}/search/filters`, query);

export const getProducts = async (sort, order, page) =>
  await axios.post(`${apiUrl}/products/`, {
    sort,
    order,
    page,
  });

export const updateProduct = async (product, slug, authtoken) =>
  await axios.put(`${apiUrl}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductCount = async () =>
  await axios.get(`${apiUrl}/products/total`);

// Ratings
export const rateProduct = async (productId, star, authtoken) =>
  await axios.put(
    `${apiUrl}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

// Ralated
export const getRelated = async (productId) =>
  await axios.get(`${apiUrl}/product/related/${productId}`);
