import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { getProduct, updateProduct } from "../../../functions/product";
import { getSubCategories } from "../../../functions/category";
import { getCategories } from "../../../functions/category";

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

  // subOptions is to list all subcategories of a category, listSubs is to store what options users selected
  const [subOptions, setSubOptions] = useState([]);
  const [listSubs, setListSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const loadProduct = () => {
    getProduct(slug)
      .then((product) => {
        setValues({ ...values, ...product.data });

        getSubCategories(product.data.category._id)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => console.log(err.data));

        let arr = product.data.subs.map((s) => s._id);
        setListSubs((prev) => arr);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);

    getSubCategories(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err.data));

    if (values.category._id === e.target.value) loadProduct();
    // clear subcategory field when change category
    setListSubs([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = listSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(values, slug, user.token)
      .then((res) => {
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="col-md-10">
      {!loading ? (
        <h4>Product Update</h4>
      ) : (
        <LoadingOutlined className="text-danger" />
      )}
      <div className="p-3">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
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
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ProductUpdate;
