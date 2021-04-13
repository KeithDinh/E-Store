import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../config/firebase";
import { createOrUpdateUser } from "../../functions/auth";

import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  // redirect after login
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  // Restrict logged-in users from accessing this login and redirect them to home
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // log user in on firebase
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const { user } = userCredential;
      const idTokenResult = await user.getIdTokenResult();

      // send token to backend
      await createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          // dispatch an action to log user in
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          // redirect based on role of user
          roleBasedRedirect(res);
        })
        .catch((error) => toast.error(error.message));
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const idTokenResult = await user.getIdTokenResult();

        await createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // dispatch an action to log user in
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            // redirect based on role of user
            roleBasedRedirect(res);
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // create a micro form component
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        shape="round"
        className="mb-3"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            block
            shape="round"
            className="mb-3"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
