// import { useEffect, useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";

import ProductSeries from "../components/home/ProductSeries";

const Home = () => {
  return (
    <>
      <div className="p-5">
        <div style={{ color: "red" }} className="display-2 font-weight-bold">
          E'STORE
        </div>
      </div>

      <h4 className="text-center p-3 mt-2 mb-5 display-3 jumbotron">
        New Arrivals
      </h4>
      <ProductSeries sort="createdAt" order="desc" limit={3} />

      <h4 className="text-center p-3 mt-2 mb-5 display-3 jumbotron">
        Best Seller
      </h4>
      <ProductSeries sort="sold" order="desc" limit={3} />
    </>
  );
};

export default Home;
