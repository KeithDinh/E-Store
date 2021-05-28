import axios from "axios";
const apiUrl = process.env.REACT_APP_API;

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
