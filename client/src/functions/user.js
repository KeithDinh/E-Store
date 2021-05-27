import axios from "axios";
const apiUrl = process.env.REACT_APP_API;

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${apiUrl}/user/cart`,
    {
      cart,
    },
    {
      header: authtoken,
    }
  );
