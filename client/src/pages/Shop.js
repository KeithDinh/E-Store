import { useState, useEffect } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getCategories } from "../functions/category";

const { SubMenu } = Menu;

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [delayRequest, setDelayRequest] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const brandList = [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
    "HP",
    "Dell",
  ];
  const [brand, setBrand] = useState("");
  const colorList = ["Black", "Brown", "Silver", "White", "Blue"];
  const [color, setColor] = useState("");
  const shippingOptions = ["Yes", "No"];
  const [shipping, setShipping] = useState("");

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
      if (text !== "") loadProductsByFilters({ query: text });
      else loadAllProducts();
    }, 700);

    return () => clearTimeout(delayed);
  }, [text]);

  const loadProductsByFilters = (queryObj) =>
    getProductsByFilter(queryObj).then((p) => setProducts(p.data));

  // 3 load products with price range
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadProductsByFilters({ price });
  }, [delayRequest]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);

    setBrand("");
    setColor("");
    setShipping("");

    setPrice(value);
    setTimeout(() => {
      setDelayRequest(!delayRequest);
    }, 700);
  };

  // 4 load products based on category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
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

    setBrand("");
    setColor("");
    setShipping("");

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
    setBrand("");
    setColor("");
    setShipping("");

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

  // 6 load product by brands
  const showBrands = () =>
    brandList.map((b, i) => (
      <Radio
        key={i}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-1 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);

    setColor("");
    setShipping("");

    setBrand(e.target.value);

    loadProductsByFilters({ brand: e.target.value });
  };

  // 7 load product by color
  const showColors = () =>
    colorList.map((c, i) => (
      <Radio
        key={i}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-1 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);

    setBrand("");
    setShipping("");

    setColor(e.target.value);
    loadProductsByFilters({ color: e.target.value });
  };

  // 8 load product by shipping
  const showShipping = () =>
    shippingOptions.map((o, i) => (
      <Radio
        key={i}
        value={o}
        name={o}
        checked={o === shipping}
        onChange={handleShipping}
        className="pb-1 pl-1 pr-4"
      >
        {o}
      </Radio>
    ));

  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);

    setBrand("");
    setColor("");

    setShipping(e.target.value);
    loadProductsByFilters({ shipping: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pt-3">
          <h4>Filters</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6"]} mode="inline">
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

            {/* Brand */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div>{showBrands()}</div>
            </SubMenu>

            {/* Color */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Color
                </span>
              }
            >
              <div>{showColors()}</div>
            </SubMenu>

            {/* Shipping */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div>{showShipping()}</div>
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
