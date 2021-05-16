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
      <div className="p-3">
        <h1
          style={{ color: "red" }}
          className="mb-0 display-2 font-weight-bold "
        >
          <span className="company-name">E'STORE</span>
        </h1>
      </div>
      <Menu
        onClick={handleClick}
        theme="dark"
        selectedKeys={[current]}
        mode="horizontal"
        className="text-white mb-3"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <SubMenu title="brands" icon={<LaptopOutlined />}>
          {loading ? (
            <h4 className="text-center">Loading...</h4>
          ) : (
            showCategories()
          )}
        </SubMenu>
        <Item key="Categories" icon={<AlignCenterOutlined />}>
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
      </Menu>
    </>
  );
};

export default Header;
