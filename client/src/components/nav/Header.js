import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LaptopOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

import { getCategories } from "../../functions/category";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {}, [user]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const showCategories = () =>
    categories
      .filter((c) => c.name !== "Others")
      .map((c) => (
        <Item key={c.name}>
          <Link to={`/products/category/${c.slug}`}> {c.name} </Link>
        </Item>
      ));

  const logout = () => {
    firebase.auth().signOut();

    // remove current user from redux
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="p-3 col-sm-2">
            <h1 className="mb-0 font-weight-bold ">
              <span className="company-name">E'STORE</span>
            </h1>
          </div>
          <div className="pt-3 col col-sm-9 marquee">
            <h1 className="mb-0 font-weight-bold">
              Provide high-quality computers and accessories. Build your dream
              gaming PC. Make your workstation faster than ever!
            </h1>
          </div>
        </div>
      </div>

      <Menu
        onClick={handleClick}
        theme="dark"
        selectedKeys={[current]}
        mode="horizontal"
        className="mb-3"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <SubMenu title="Brands" icon={<LaptopOutlined />}>
          {loading ? (
            <h4 className="text-center">Loading...</h4>
          ) : (
            <>
              {showCategories()}
              <Item key="Others">
                <Link to={`/products/category/others`}> Others </Link>
              </Item>
            </>
          )}
        </SubMenu>
        <Item key="category" icon={<AlignCenterOutlined />}>
          <Link to="/category">Category</Link>
        </Item>
        {!user ? (
          <>
            <Item
              key="register"
              icon={<UserAddOutlined />}
              className="float-right"
            >
              <Link to="/register">Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
          </>
        ) : (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]} // if user.email exists, grab the first part of email
            className="float-right"
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}
            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        <span className="float-right p-1 ">
          <Search />
        </span>
      </Menu>
    </>
  );
};

export default Header;
