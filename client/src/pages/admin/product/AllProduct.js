import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount, removeProduct } from "../../../functions/product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setLoading(true);
      removeProduct(slug, user.token)
        .then((res) => {
          loadProducts();
          toast.success(`${res.data.title} is removed`);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
          console.log(error);
        })
        .finally(setLoading(false));
    }
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
            <AdminProductCard product={product} handleRemove={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
