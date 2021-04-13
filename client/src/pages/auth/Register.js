import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  // Restrict logged-in users from accessing this forgot password and redirect them to home
  let { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // set the return route from email confirmation
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL + `/${email}/`,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    // clear state
    setEmail("");
  };

  // create a micro form component
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
