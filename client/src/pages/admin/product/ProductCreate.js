import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../../functions/product";

import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then((res) => {
        setValues(initialState);
        toast.success("Product created");
      })
      .catch((err) => toast.error(err.response.data.err))
      .finally(() => {
        setLoading(false);
        // history.push("/admin/dashboard");
      });
  };

  return (
    <div className="col-md-10">
      {/* {!loading ? (
            <h4>Product create</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )} */}
      <h4>Product create</h4>
      <hr />
      <ProductCreateForm
        handleSubmit={handleSubmit}
        values={values}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ProductCreate;
