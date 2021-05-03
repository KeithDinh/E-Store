import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  };

  return (
    <>
      <div className="jumbotron">
        {!loading ? (
          <h4>Product create</h4>
        ) : (
          <LoadingOutlined className="text-danger" />
        )}
      </div>
      <div className="container">
        {products.map((p) => (
          <ProductCard />
        ))}
      </div>
    </>
  );
};

export default Home;
