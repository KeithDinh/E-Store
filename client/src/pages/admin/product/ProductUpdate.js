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

const ProductUpdate = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  let { slug } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("simple product", p);
      setValues({ ...values, ...p.data });
    });
  };

  return (
    <div className="col-md-10">
      <h4>Product Update</h4>
    </div>
  );
};

export default ProductUpdate;
