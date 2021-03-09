import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";

import { currentUser } from "./functions/Auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  let dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    // onAuthStateChanged: persist user after refresh
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user);

      if (user) {
        console.log(user.getIdTokenResult());
        const idTokenResult = await user.getIdTokenResult();

        await currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name.split("@")[0],
                email: res.data.name,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
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
