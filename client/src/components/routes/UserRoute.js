import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// check if user logged in for private page
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest}></Route> : <LoadingToRedirect />;
};

export default UserRoute;
