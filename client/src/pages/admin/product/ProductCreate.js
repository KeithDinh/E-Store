import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct, getSubCategories } from "../../../functions/product";
import { getCategories } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";

import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  shipping: "",
  quantity: "",
  categories: [],
  category: "",
  subs: [],
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP", "Dell"],
  brand: "",
};

const ProductCreate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [category, setCategory] = useState("");
  const [subOptions, setSubOptions] = useState([]);

  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => {
    // Unstable, sometime won't work:
    setValues((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    // calling handleChange(e) is unstable for category
    // let obj = values;
    // obj[e.target.name] = e.target.value;
    // setValues(obj);
    setCategory(e.target.value);
    // handleChange(e);

    getSubCategories(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        setValues({ ...values, subs: [] });
      })
      .catch((err) => console.log(err.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.category = category;

    createProduct(values, user.token)
      .then((res) => {
        setValues(initialState);
        toast.success("Product created");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="col-md-10">
      {!loading ? (
        <h4>Product create</h4>
      ) : (
        <LoadingOutlined className="text-danger" />
      )}
      <hr />
      <div className="p-3">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
      <ProductCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        values={values}
        subOptions={subOptions}
        setValues={setValues}
      />
    </div>
  );
};

export default ProductCreate;
