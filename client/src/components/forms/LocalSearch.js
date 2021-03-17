const LocalSearch = ({ keyword, setKeyword }) => {
  return (
    <input
      type="seach"
      placeholder="Filter"
      value={keyword}
      onChange={(e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
      }}
      className="form-control mb-4 w-50"
    />
  );
};

export default LocalSearch;
