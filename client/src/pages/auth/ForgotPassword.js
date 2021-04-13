import { auth } from "../../config/firebase.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // Restrict logged-in users from accessing this forgot password and redirect them to home
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // firebase config
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    // firebase handle forgot password
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        toast.success("Please check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button
          className="btn btn-raised"
          disabled={!email || !email.includes("@")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
