import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// check if user logged in for private page
const UserRoute = (props) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...props}></Route>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
