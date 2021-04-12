import UserNav from "../../components/nav/UserNav";

const Wishlist = ({ history }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User Wishlist Page</div>
      </div>
    </div>
  );
};

export default Wishlist;
