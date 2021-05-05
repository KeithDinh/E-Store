import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

import { getProducts, getProductCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const ProductSeries = ({ sort, order, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
    getProductCount().then((res) => setProductCount(res.data));
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts(sort, order, limit).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={limit} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSeries;
