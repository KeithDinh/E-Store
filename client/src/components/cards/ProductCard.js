import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

import laptop from "../../images/laptop.png";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
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
            <ShoppingCartOutlined className="text-danger" /> <br />
            Add to Cart
          </>,
        ]}
      >
        <Meta
          title={
            <div>
              {title} <h5 className="text-warning">${price}</h5>
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
