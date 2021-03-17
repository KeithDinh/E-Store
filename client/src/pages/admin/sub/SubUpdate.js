import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateSub, getSub } from "../../../functions/sub";

import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ history, match, ...props }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState("");

  useEffect(() => {
    const loadSub = () => {
      getSub(match.params.slug).then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      });
    };

    return loadSub();
  }, [match.params.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(parent);
    updateSub(user.token, match.params.slug, { name, parent })
      .then((res) => {
        setName("");
        toast.success(`Sub Category ${name} updated`);
        history.push("/admin/sub");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="col">
      {!loading ? (
        <h4>Update category {name}</h4>
      ) : (
        <h4 className="text-danger">Loading...</h4>
      )}

      <div className="form-group">
        <select
          required
          onChange={(e) => setParent(e.target.value)}
          name="category"
          className="custom-select custom-select-sm w-25"
        >
          {props.location.state.categories.map((c) => (
            <option key={c._id} value={c._id} selected={c._id === parent}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default SubUpdate;
