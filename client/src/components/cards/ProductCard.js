import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";

import laptop from "../../images/laptop.png";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug, price, quantity } = product;
  const [toolTip, setToolTip] = useState("Click to add");

  const dispatch = useDispatch();
  // const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    let cart;

    // only window has localStorage
    if (typeof window !== "undefined") {
      // if cart exists
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      // remove duplicates using lodash
      let unique = _.uniqWith(cart, _.isEqual);

      // save to localStorage
      localStorage.setItem("cart", JSON.stringify(unique));

      // hover over Add to Cart
      setToolTip("Added");

      // update redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // show side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  return (
    <>
      {product && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="m-2"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <Tooltip title={toolTip}>
              <a onClick={handleAddToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Add to Cart
              </a>
            </Tooltip>
          </>,
        ]}
      >
        <Meta
          title={
            <div>
              {title}
              <h5 className="price mt-2">
                <span className="price__upper">$</span>
                <span
                  style={{ textDecoration: quantity < 1 && "line-through" }}
                >
                  {price}
                </span>{" "}
                {quantity < 1 && "Out of Stock"}
              </h5>
            </div>
          }
          description={`${
            description && description.split(" ").splice(0, 10).join(" ")
          }...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
