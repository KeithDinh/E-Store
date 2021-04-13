import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard.";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

import AdminSideMenu from "./components/hoc/AdminSideMenu";

import { currentUser } from "./functions/auth";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import AllProducts from "./pages/admin/product/AllProduct";

const App = () => {
  let dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data[0].name.split("@")[0],
                email: res.data[0].name,
                token: idTokenResult.token,
                role: res.data[0].role,
                _id: res.data[0]._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });

    // clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminSideMenu(AdminDashboard)}
        />
        <AdminRoute
          exact
          path="/admin/category"
          component={AdminSideMenu(CategoryCreate)}
        />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={AdminSideMenu(CategoryUpdate)}
        />
        <AdminRoute
          exact
          path="/admin/sub"
          component={AdminSideMenu(SubCreate)}
        />
        <AdminRoute
          exact
          path="/admin/sub/:slug"
          component={AdminSideMenu(SubUpdate)}
        />
        <AdminRoute
          exact
          path="/admin/product/"
          component={AdminSideMenu(ProductCreate)}
        />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={AdminSideMenu(ProductUpdate)}
        />
        <AdminRoute
          exact
          path="/admin/products/"
          component={AdminSideMenu(AllProducts)}
        />
        <Route
          strict
          path="/register/complete/:email"
          component={RegisterComplete}
        />
      </Switch>
    </>
  );
};

export default App;
