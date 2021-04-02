import { auth } from "../../firebase.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validators, errorDiv } from "../../utils/PasswordValidator";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  // useParams gets the parameter from the route, check out App.js on the route to this component for more info
  const params = useParams();
  const email = params.email;

  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    if (passwordErrors.length > 0) {
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

            history.push("/");
          })
          .catch((error) => toast.error(error.message));
        // redirect
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // create a micro form component
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
          setPasswordErrors(validators(e.target.value));
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
          {errorDiv(passwordErrors)}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
