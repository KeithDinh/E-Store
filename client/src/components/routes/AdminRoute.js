import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
import { toast } from "react-toastify";
import AdminSideMenu from "../hoc/AdminSideMenu";

const AdminRoute = ({ component, ...rest }) => {
  const [authorized, setAuthorized] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((admin) => {
          setAuthorized(true);
        })
        .catch((error) =>
          toast.error("You are not authorized to access this page")
        );
    }
  }, [user]);
  return authorized ? (
    <Route component={AdminSideMenu(component)} {...rest}></Route>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
