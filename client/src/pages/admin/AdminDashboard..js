import { useEffect, useState } from "react";
import { useSelector, useReducer } from "react-redux";
import { toast } from "react-toastify";

import Orders from "../../components/order/Orders";
import { getOrders, updateOrderStatus } from "../../functions/admin";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
    });
  };

  return (
    <div className="col">
      <h4>Admin Dashboard</h4>
      <Orders orders={orders} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default AdminDashboard;
