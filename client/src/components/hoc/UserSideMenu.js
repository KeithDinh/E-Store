import UserNav from "../nav/UserNav";

const UserSideMenu = (Component) => (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default UserSideMenu;
