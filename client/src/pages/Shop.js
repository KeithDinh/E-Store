import { useState, useEffect } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getCategories } from "../functions/category";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [delayRequest, setDelayRequest] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState(0);

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
      if (text != "") loadProductsByFilters({ query: text });
      else loadAllProducts();
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
    setCategoryIds([]);
    setStar("");

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
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const handleCheckbox = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");

    let inTheState = [...categoryIds];
    let foundInTheState = inTheState.indexOf(e.target.value);

    if (foundInTheState === -1) inTheState.push(e.target.value);
    else inTheState.splice(foundInTheState, 1);

    setCategoryIds(inTheState);

    loadProductsByFilters({ category: inTheState });
  };

  // 5 load products by star ratings
  const handleStarClick = (number) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);

    setStar(number);
    loadProductsByFilters({ stars: number });
  };
  const showStar = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star handleStarClick={handleStarClick} numberOfStars={5} />
      <Star handleStarClick={handleStarClick} numberOfStars={4} />
      <Star handleStarClick={handleStarClick} numberOfStars={3} />
      <Star handleStarClick={handleStarClick} numberOfStars={2} />
      <Star handleStarClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pt-3">
          <h4>Filters</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3"]} mode="inline">
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

            {/* Rating */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div>{showStar()}</div>
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
