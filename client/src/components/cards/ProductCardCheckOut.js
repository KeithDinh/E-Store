import laptop from "../../images/laptop.png";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CheckCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardCheckOut = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </div>
      </td>
      <td>
        <Link to={`/product/${p.slug}`}>{p.title} </Link>{" "}
      </td>
      <td>{p.price}</td>
      <td>{p.brand}</td>
      <td>
        <select
          name="color"
          className="form-control"
          onChange={handleColorChange}
        >
          {p.color ? (
            <option value={p.color}>{p.color}</option>
          ) : (
            <option>Select</option>
          )}
          {colors
            .filter((c) => c !== p.color)
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </td>
      <td>
        <input
          min="1"
          max={p.quantity}
          type="number"
          className="form-control"
          value={p.count}
          onChange={handleQuantityChange}
        />
      </td>
      <td>
        {p.shipping === "Yes" ? (
          <CheckCircleFilled className="text-sucess" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        )}
      </td>
      <td>
        <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
      </td>
    </tr>
  );
};

export default ProductCardCheckOut;
