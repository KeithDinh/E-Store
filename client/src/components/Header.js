import { useState } from "react";
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

const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => state);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    // log user out from firebase
    firebase.auth().signOut();

    // dispatch action to remove current user from redux
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    // redirect user to log out page
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user ? (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      ) : (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]} // if user.email exists, grab the first part of email
          className="float-right"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
