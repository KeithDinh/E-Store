import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategory,
  removeCategory,
  getCategories,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleRemove = async (slug) => {
    setLoading(true);
    if (window.confirm(`Do you want to remove ${slug}`)) {
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

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="Name"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button
          disabled={loading || name.length < 2}
          className="btn btn-outline-primary"
        >
          Save
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {!loading ? (
            <h4>Create category</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          {categoryForm()}
          <hr />
          {categories?.map((c, index) => (
            <div className="round alert alert-primary w-50" key={index}>
              {c.name}{" "}
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
    </div>
  );
};

export default CategoryCreate;
