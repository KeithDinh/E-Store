import axios from "axios";
const apiUrl = process.env.REACT_APP_API;

export const getUserAddress = async (authtoken) =>
  await axios.get(`${apiUrl}/user/address`, { headers: { authtoken } });

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${apiUrl}/user/cart`,
    {
      cart,
    },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${apiUrl}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.put(
    `${apiUrl}/user/cart`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${apiUrl}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

// Order
export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${apiUrl}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${apiUrl}/user/orders`, { headers: { authtoken } });
