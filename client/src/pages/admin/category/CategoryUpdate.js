import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../functions/category";

import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryCreate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategory = useCallback(() => {
    getCategory(match.params.slug).then((c) => setName(c.data.name));
  }, [match.params.slug]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(user.token, match.params.slug, { name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Category ${name} updated`);
        history.push("/admin/category");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.message);
      });
  };

  return (
    <div className="col">
      {!loading ? (
        <h4>Update category {match.params.slug}</h4>
      ) : (
        <h4 className="text-danger">Loading...</h4>
      )}
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default CategoryCreate;
