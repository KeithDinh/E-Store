import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {}, [user]);

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
        <div style={{ color: "red" }} className="display-2 font-weight-bold">
          E'STORE
        </div>
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
