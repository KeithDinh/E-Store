import { useSelector, useState } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
  getCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCoupon = () => {
  return <div>Coupon</div>;
};

export default CreateCoupon;
