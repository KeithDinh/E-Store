import { useEffect, useState } from "react";
import { getProduct } from "../../functions/product";
import SingleProduct from "../../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState("");
  const { slug } = match.params;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <br />
      <h4 className="text-center p-3 mt-2 mb-5 display-3 jumbotron">
        Related Products
      </h4>
      <div className="row"></div>
    </div>
  );
};

export default Product;
