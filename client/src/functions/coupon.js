import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const getCoupons = async () => await axios.get(`${apiUrl}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${apiUrl}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${apiUrl}/coupon`,
    {
      coupon,
    },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCoupon = async (name) =>
  await axios.get(`${apiUrl}/coupon/${name}`);

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${apiUrl}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
