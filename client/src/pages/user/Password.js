import { auth } from "../../config/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { validators, errorDiv } from "../../utils/PasswordValidator";

const Password = ({ history }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordErrors.length > 0) {
      toast.error("Please create a stronger password!!");
      setLoading(false);
      return;
    }

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  const passwordUpdateForm = () => (
    <form className="form-group" onSubmit={handleSubmit}>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordErrors(validators(e.target.value));
        }}
        disabled={loading}
        className="form-control"
        placeholder="Password"
      />
      <br />
      <button
        className="btn btn-primary"
        disabled={!password || loading || passwordErrors.length > 0}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="col">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Password Update</h4>
      )}
      {passwordUpdateForm()}
      {errorDiv(passwordErrors)}
    </div>
  );
};

export default Password;
