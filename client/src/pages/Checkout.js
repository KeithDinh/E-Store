import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAdress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  }, []);

  const saveAddressToDB = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setSavedAddress(true);
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
      toast.success("Empty Cart");
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAdress} />
      <button className="btn btn-prmary mt-2" onClick={saveAddressToDB}>
        Save
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

  const applyDiscountCoupon = () => {};

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        onChange={(e) => setCoupon(e.target.value)}
        className="form-control w-50"
        value={coupon}
      />
      <button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>
        Apply
      </button>
    </>
  );
  return (
    <div className="row m-2">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon</h4>
        <br />
        {showApplyCoupon()}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!savedAddress || !products.length}
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
