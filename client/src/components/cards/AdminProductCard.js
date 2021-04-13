import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const AdminProductCard = ({ product, handleRemove }) => {
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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
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

export default AdminProductCard;
