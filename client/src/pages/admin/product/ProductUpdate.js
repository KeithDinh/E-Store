import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSubCategories, getProduct } from "../../../functions/product";
import { getCategories } from "../../../functions/category";
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
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  let { slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listSubs, setListSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

        getSubCategories(p.data.category._id)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => console.log(err.data));

        let arr = [];
        p.data.subs.map((s) => {
          arr.push(s._id);
        });

        setListSubs((prev) => arr);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    handleChange(e);

    setSelectedCategory(e.target.value);

    getSubCategories(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err.data));

    if (values.category._id === e.target.value) loadProduct();
    setListSubs([]);
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
        listSubs={listSubs}
        setListSubs={setListSubs}
      />
    </div>
  );
};

export default ProductUpdate;
