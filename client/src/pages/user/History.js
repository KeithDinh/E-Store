import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { getUserOrders } from "../../functions/user";

const History = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data));
      setOrders(res.data);
    });
  };

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>Show Payment Info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  const showOrderInTable = (order) => <p>Each order and products</p>;
  return (
    <div className="col">
      <h4>
        {orders.length > 0 ? "user purchase orders" : "No purchase orders"}
      </h4>
      {showEachOrders()}
    </div>
  );
};

export default History;
