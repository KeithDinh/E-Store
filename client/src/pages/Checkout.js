import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const saveAddressToDB = () => {};

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

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <button className="btn btn-prmary mt-2" onClick={saveAddressToDB}>
          Save
        </button>
        <hr />
        <h4>Got Coupon</h4>
        <br />
        Coupon Input and Apply Button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${total}</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Orders</button>
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
