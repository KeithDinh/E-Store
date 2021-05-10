import { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { slug } = useParams();

  let history = useHistory();

  const showModal = () => {
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: {
          from: `/product/${slug}`,
        },
      });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    toast.success("Thank you for your review.");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div onClick={showModal}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
