import { auth, googleAuthProvider } from "../../firebase.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { validators, errorDiv } from "../../utils/PasswordValidator";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState([]);
  // useParams gets the parameter from the route, check out App.js on the route to this component for more info

  const params = useParams();

  useEffect(() => {
    setEmail(params.email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    if (passwordErr.length > 0) {
      toast.error("Please create a stronger password!!");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      // if the email exists in database
      if (result.user.emailVerified) {
        // get current user
        let user = auth.currentUser;

        // update pw
        await user.updatePassword(password);

        // get token result
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Password"
        autoFocus
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordErr(validators(e.target.value));
        }}
      />

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
          {errorDiv(passwordErr)}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
