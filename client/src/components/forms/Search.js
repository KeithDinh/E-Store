import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };
  const handleSubmmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form
      className="form-inline my-3 my-lg-0 bg-white px-2 "
      onSubmit={handleSubmmit}
    >
      <input
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
        onChange={handleChange}
      />
      <SearchOutlined
        onClick={handleSubmmit}
        style={{ cursor: "pointer", color: "black" }}
      />
    </form>
  );
};

export default Search;
