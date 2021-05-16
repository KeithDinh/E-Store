import { useEffect, useState } from "react";
import { getSubs } from "../../functions/sub";
import { Link } from "react-router-dom";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((c) => (
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
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
