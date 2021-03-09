import UserNav from "../../components/nav/UserNav";

const History = ({ history }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User History Page</div>
      </div>
    </div>
  );
};

export default History;
