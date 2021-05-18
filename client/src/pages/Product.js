import { useEffect, useState } from "react";
import { getProduct, getRelated, rateProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState("");
  const [relatedProducts, setRelatedProducts] = useState("");
  const [star, setStar] = useState(0);

  const { slug } = match.params;
  const { user } = useSelector((state) => state);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {}, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        let existingRatingObject = res.data.ratings.find(
          (e) => JSON.stringify(e.postedBy) === JSON.stringify(user._id)
        );
        existingRatingObject && setStar(existingRatingObject.star);

        getRelated(res.data._id)
          .then((res) => {
            setRelatedProducts(res.data);
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const onRatingClick = (newRating, productId) => {
    setStar(newRating);
    rateProduct(productId, newRating, user.token)
      .then((res) => toast.success("Thank you for your rating!"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onRatingClick={onRatingClick}
          star={star}
        />
      </div>
      <br />
      <h4 className="text-center p-3 mt-2 mb-5 display-3 jumbotron">
        Related Products
      </h4>
      <div className="container">
        <div className="row">
          {relatedProducts.length &&
            relatedProducts.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
