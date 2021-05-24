import { useState, useEffect } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { getCategories } from "../functions/category";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [delayRequest, setDelayRequest] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // 1 load default when page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2 load products with filter/search
  useEffect(() => {
    const delayed = setTimeout(() => {
      loadProductsByFilters({ query: text });
    }, 700);

    return () => clearTimeout(delayed);
  }, [text]);

  const loadProductsByFilters = (queryObj) =>
    getProductsByFilter(queryObj).then((p) => setProducts(p.data));

  // 3 load products with price range
  useEffect(() => {
    loadProductsByFilters({ price });
  }, [delayRequest]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setDelayRequest(!delayRequest);
    }, 700);
  };

  // 4 load products based on category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c.id}>
        <Checkbox
          onChange={handleCheckbox}
          className="pt-2 pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const handleCheckbox = (e) => {
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) inTheState.push(justChecked);
    else inTheState.splice(foundInTheState, 1);

    setCategoryIds(inTheState);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pt-3">
          <h4>Filters</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            {/* Price slider  */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={(value) => handleSlider(value)}
                  max="4999"
                />
              </div>
            </SubMenu>

            {/* Category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Category
                </span>
              }
            >
              <div>{categories && showCategories()}</div>
            </SubMenu>
          </Menu>
        </div>

        {/* Title */}
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger"> Loading...</h4>
          ) : (
            <h4 className="p-3 mb-5 display-4 font-weight-bold">Products</h4>
          )}

          {/* Products */}
          {products.length < 1 && <p>No products found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
