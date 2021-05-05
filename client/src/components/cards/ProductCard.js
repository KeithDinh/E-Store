import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import laptop from "../../images/laptop.png";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
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
        title={title}
        description={`${
          description && description.split(" ").splice(0, 10).join(" ")
        }...`}
      />
    </Card>
  );
};

export default ProductCard;
