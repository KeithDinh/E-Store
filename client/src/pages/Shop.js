import { useState, useEffect } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // load default when page load
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // load products with filter/search
  useEffect(() => {
    const delayed = setTimeout(() => {
      loadProductsByFilters({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const loadProductsByFilters = (query) => {
    getProductsByFilter(query).then((p) => {
      setProducts(p.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger"> Loading...</h4>
          ) : (
            <h4 className="p-3 mb-5 display-4 font-weight-bold">Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
