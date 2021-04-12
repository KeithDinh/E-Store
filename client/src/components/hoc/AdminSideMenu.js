import AdminNav from "../nav/AdminNav";

const AdminSideMenu = (Component) => (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default AdminSideMenu;
