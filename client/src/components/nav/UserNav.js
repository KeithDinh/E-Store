import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserNav = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          {user && user.role === "admin" && (
            <Link to="/admin/dashboard" className="text-warning nav-link">
              Back to Dashboard
            </Link>
          )}
        </li>
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
