import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCardCheckOut from "../components/cards/ProductCardCheckOut";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  // const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.count;
    }, 0);
  };

  const saveOrderToDB = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart err", err));
  };

  const showItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Images</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((p) => (
          <ProductCardCheckOut key={p._id} p={p} />
        ))}
      </tbody>
    </table>
  );
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <h4>
              Cart is empty. <Link to="/shop">Continue Shopping</Link>
            </h4>
          ) : (
            showItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDB}
              disabled={!cart.length}
              className="btn btn-sm btn-primary mt-2"
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "/cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
