import { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col md-3 btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/products/category/${c.slug}`}> {c.name} </Link>
      </div>
    ));
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
