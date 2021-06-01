import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const createPaymentIntent = async (authtoken) =>
  await axios.post(
    `${apiUrl}/create-payment-intent`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
