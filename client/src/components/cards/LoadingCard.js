import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let returnCards = [];
    for (let i = 0; i < count; i++) {
      returnCards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return returnCards;
  };
  console.log(cards);
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
