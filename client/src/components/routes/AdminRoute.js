import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
import { toast } from "react-toastify";

const AdminRoute = ({ children, ...rest }) => {
  const [authorized, setAuthorized] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((admin) => {
          setAuthorized(true);
          // toast.success("Authorized");
        })
        .catch((error) =>
          toast.error("You are not authorized to access this page")
        );
    }
  }, [user]);
  return authorized ? <Route {...rest}></Route> : <LoadingToRedirect />;
};

export default AdminRoute;
