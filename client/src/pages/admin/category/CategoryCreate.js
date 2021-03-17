import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  removeCategory,
  getCategories,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); // typing name of category
  const [categories, setCategories] = useState([]); // to list out all category or filter
  const [keyword, setKeyword] = useState(""); // for filtering list of categories

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Do you want to remove ${slug}`)) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then(() => {
          setLoading(false);
          toast.success(`${slug} is removed`);
          loadCategories();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory(user.token, { name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`New category ${name} created`);
        loadCategories();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.message);
      });
  };

  // High-order function
  const searched = (keyword) => {
    return (c) => c.name.toLowerCase().includes(keyword);
  };

  return (
    <div className="col">
      {!loading ? (
        <h4>Create category</h4>
      ) : (
        <h4 className="text-danger">Loading...</h4>
      )}
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      <div className="d-flex ">
        {categories.filter(searched(keyword)).map((c, index) => (
          <div
            className="round m-2 alert alert-primary text-center"
            key={index}
          >
            {c.name} <br />
            <span
              onClick={() => handleRemove(c.slug)}
              className="btn btn-sm float-right"
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <Link to={`/admin/category/${c.slug}`}>
              <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCreate;
