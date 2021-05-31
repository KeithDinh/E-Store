import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} is created`);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Confirm to delete")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          getCoupons().then((res) => setCoupons(res.data));
          setLoading(false);
          toast.success(`Coupon ${res.data.name} was deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      {!loading ? <h4>Coupon</h4> : <LoadingOutlined className="text-danger" />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name </label>
          <br />
          <input
            type="text"
            className="form-group w-25"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Discount %</label>
          <br />
          <input
            type="number"
            min="1"
            max="100"
            className="form-group w-25"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Expiry</label>
          <br />
          <DatePicker
            className="form-control"
            selected={expiry}
            required
            onChange={(date) => setExpiry(date)}
          />
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>

      <br />
      <h4>{coupons.length} Coupons </h4>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Expiry</th>
            <th scope="col">Discount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{new Date(c.expiry).toLocaleDateString()}</td>
              <td>{c.discount}%</td>
              <td>
                <DeleteOutlined
                  onClick={() => handleRemove(c._id)}
                  className="text-danger pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCoupon;
