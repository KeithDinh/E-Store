import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const createPaymentIntent = async (authtoken, coupon) =>
  await axios.post(
    `${apiUrl}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
