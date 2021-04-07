import { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount } from "../../../functions/product";

const AllProducts = () => {
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
    <div className="col">
      {!loading ? (
        <h4>All Products</h4>
      ) : (
        <h4 className="text-danger">Loading...</h4>
      )}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <AdminProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
