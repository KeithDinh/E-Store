import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import laptop from "../images/laptop.png";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { createOrder, emptyUserCart } from "../functions/user";

import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [cartTotal, setCartTotal] = useState(0); // amount before discount
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0); // amount after discount
  const [payable, setPayable] = useState(0); // amount after discount in cents

  // states from Stripe documents https://stripe.com/docs/payments/integration-builder
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (user)
      createPaymentIntent(user.token, coupon).then((res) => {
        console.log(res.data);

        setClientSecret(res.data.clientSecret);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage, redux, and db
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });

          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });

          emptyUserCart(user.token);
        }
      });

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              Total after discount: <strong>${totalAfterDiscount}</strong>
            </p>
          ) : (
            <p className="alert alert-danger">
              No coupon applied. <Link to="/checkout">Apply your coupon</Link>
            </p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={laptop}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable: $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span className="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful{" "}
          <Link to="/user/history"> See order in history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
