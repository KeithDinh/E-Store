import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState(""); // type out name of sub category
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]); // get all subs to display
  const [categories, setCategories] = useState([]); // for dropdown select of parent
  const [category, setCategory] = useState(""); // parent of sub category
  const [keyword, setKeyword] = useState(""); // for filtering

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const loadSubCategories = () => {
    getSubs().then((s) => setSubs(s.data));
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Do you want to remove ${slug}?`)) {
      setLoading(true);
      removeSub(slug, user.token)
        .then(() => {
          toast.success(`${slug} is removed`);
          loadSubCategories();
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSub(user.token, { name, parent: category })
      .then((res) => {
        setName("");
        toast.success(`New category ${name} created`);
        loadSubCategories();
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // High-order function
  const searched = (keyword) => {
    return (c) => c.name.toLowerCase().includes(keyword);
  };

  return (
    <div className="col">
      {!loading ? (
        <h4>Create sub category</h4>
      ) : (
        <h4 className="text-danger">Loading...</h4>
      )}
      <br />
      <div className="form-group">
        <select
          required
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          placeholder="Select the category"
          className="custom-select custom-select-sm w-25"
        >
          <option value="">Not Selecting</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {category.length > 0 && (
        <CategoryForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />
      )}

      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      <div className="d-flex flex-wrap">
        {subs
          .filter((s) => (category !== "" ? s.parent === category : true))
          .filter(searched(keyword))
          .map((s, index) => (
            <div className="m-2 alert alert-primary text-center" key={index}>
              {s.name} <br />
              <Link
                to={{
                  pathname: `/admin/sub/${s.slug}`,
                  state: { categories },
                }}
              >
                <span className="btn btn-sm ">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm "
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCreate;
