import { Card, Tabs } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";

import laptop from "../../images/laptop.png";
import ProductInfo from "./ProductInfo";
import RatingModel from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onRatingClick, star }) => {
  const { title, images, description, _id } = product;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((img) => (
                <div key={img.public_id}>
                  <img src={img.url} alt={img.url} />
                </div>
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={laptop}
                className="mb-3 slide-default-img"
                alt="laptop"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Contact us on xxx xxx xxxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="p-3 text-center">{title}</h1>
        {product && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,
            <RatingModel>
              <StarRating
                name={_id}
                starRatedColor="red"
                isSelectable={true}
                rating={star}
                numberOfStars={5}
                changeRating={onRatingClick}
              />
            </RatingModel>,
          ]}
        >
          <ProductInfo product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
