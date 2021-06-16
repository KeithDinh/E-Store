import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserSideMenu from "../hoc/UserSideMenu";
import { currentUser } from "../../functions/auth";

// check if user logged in for private page
const UserRoute = ({ component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentUser(user.token)
        .then((res) => {
          setAuthorized(true);
        })
        .catch((error) =>
          toast.error("You are not authorized to access this page")
        );
    }
  }, [user]);
  return authorized ? (
    <Route component={UserSideMenu(component)} {...rest}></Route>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
