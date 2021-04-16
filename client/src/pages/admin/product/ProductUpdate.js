import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createProduct,
  getCategorySubs,
  getProduct,
} from "../../../functions/product";
import { getCategories } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  shipping: "",
  quantity: "",
  category: "",
  subs: [],
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP", "Dell"],
  brand: "",
};

const ProductUpdate = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { loading, setLoading } = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  let { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const loadProduct = () => {
    getProduct(slug)
      .then((p) => {
        setValues({ ...values, ...p.data });

        getCategorySubs(p.data.category._id)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => console.log(err.data));
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    // calling handleChange(e) is unstable for category
    let obj = values;
    obj[e.target.name] = e.target.value;
    setValues(obj);

    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err.data));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <div className="col-md-10">
      <h4>Product Update</h4>
      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        values={values}
        subOptions={subOptions}
        setValues={setValues}
        categories={categories}
      />
    </div>
  );
};

export default ProductUpdate;
