import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  values,
  handleChange,
  handleCategoryChange,
  subOptions,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
    subs,
    quantity,
    colors,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control w-50"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control w-50"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col-md-2">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control "
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <label>Shipping</label>
            <br />
            <select
              name="shipping"
              className="custom-select custom-select-sm"
              onChange={handleChange}
              value={values.shipping === "Yes" ? "Yes" : "No"}
            >
              <option value="No"> No</option>
              <option value="Yes"> Yes</option>
            </select>
          </div>
          <div className="col-md-2">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control w-15"
              value={quantity}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col-md-2">
            <label>Color</label>
            <br />
            <select
              name="color"
              className="custom-select custom-select-sm "
              onChange={handleChange}
              value={values.color}
            >
              {colors.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label>Brand</label>
            <br />
            <select
              name="brand"
              className="custom-select custom-select-sm "
              onChange={handleChange}
              value={values.brand}
            >
              {brands.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Category</label> <br />
        <select
          onChange={handleCategoryChange}
          name="category"
          className="custom-select custom-select-sm w-25"
          value={values.category.name}
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {subOptions?.length > 0 && (
        <div className="form-group">
          <label>Sub Categories</label>
          <br />
          <Select
            mode="multiple"
            style={{ width: "50%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      <button onClick={handleSubmit} className="btn btn-outline-info">
        Submit
      </button>
    </form>
  );
};

export default ProductUpdateForm;
