import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/cards/ProductCard";

import { getProductsBySub } from "../../functions/product";

const CategoryHome = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState({});

  useEffect(() => {
    setLoading(true);
    getProductsBySub(slug).then((c) => {
      setSub(c.data.sub);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mb-5 display-3">Loading...</h4>
          ) : (
            <h4 className="text-center p-3 mb-5 display-3">
              {products && products.length} <b>{sub.name}</b> products
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products &&
          products.map((p) => (
            <div className="col" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryHome;
