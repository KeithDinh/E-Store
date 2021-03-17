const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="Name"
          type="text"
          className="form-control w-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button disabled={name.length < 2} className="btn btn-outline-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
