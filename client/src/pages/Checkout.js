import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getUserAddress,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
} from "../functions/user";
import { applyCoupon } from "../functions/coupon";

const Checkout = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAdress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user) {
      getUserCart(user.token)
        .then((res) => {
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
        .catch((err) => console.log(err));

      getUserAddress(user.token).then((res) => {
        setSavedAddress(res.data.address);
      });
    }
  }, [user]);

  const saveAddressToDB = () => {
    console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setSavedAddress(address);
        toast.success("Address saved");
      }
    });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") localStorage.removeItem("cart");

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((r) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCouponName("");
      toast.success("Empty Cart");
    });

    history.push("/cart");
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, couponName).then((res) => {
      let applied = true;
      if (res.data.err) {
        setDiscountError(res.data.err);
        applied = false;
      } else {
        setTotalAfterDiscount(res.data);
      }

      dispatch({
        type: "COUPON_APPLIED",
        payload: applied,
      });
    });
  };

  // Functions to display component
  const showAddress = () => (
    <>
      {!loading && (
        <ReactQuill theme="snow" value={address} onChange={setAdress} />
      )}
      <button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
        Save new address
      </button>
    </>
  );

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        onChange={(e) => {
          setCouponName(e.target.value);
          setDiscountError("");
        }}
        className="form-control w-50"
        value={couponName}
      />
      <button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>
        Apply
      </button>
    </>
  );

  const showTotal = () => (
    <p>
      Cart Total:{" "}
      {totalAfterDiscount !== 0 ? (
        <span>
          {" "}
          <span style={{ textDecoration: "line-through" }}>${total}</span> - $
          {totalAfterDiscount}
        </span>
      ) : (
        <span>${total}</span>
      )}
    </p>
  );

  return (
    <div className="row m-2">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <div dangerouslySetInnerHTML={{ __html: savedAddress }} />
        {showAddress()}
        <hr />
        <h4>Got Coupon</h4>
        <br />
        {showApplyCoupon()} <br />
        {discountError && (
          <p className="bg-danger p-2 w-50 text-center text-white text-bold">
            {discountError}
          </p>
        )}
        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2 w-50 text-center text-white text-bold">
            {couponName} Discount Applied
          </p>
        )}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Item Quantity: {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        {showTotal()}

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!products.length || savedAddress === "<p><br></p>"}
              onClick={() => history.push("/payment")}
            >
              Place Orders
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={emptyCart}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
