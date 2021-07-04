import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getUserOrders } from "../../functions/user";

import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

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
      <div key={i} className="m-5 p-3 card text-center">
        <p>Show Payment Info</p>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col text-center">
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col"> Title</th>
          <th scope="col"> Price</th>
          <th scope="col"> Brand</th>
          <th scope="col"> Color</th>
          <th scope="col"> Count</th>
          <th scope="col"> Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CheckCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
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
