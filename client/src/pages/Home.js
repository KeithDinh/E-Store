import ProductSeries from "../components/home/ProductSeries";

const Home = () => {
  return (
    <>
      <div className="container">
        <h4 className="p-3 mb-5 display-4 font-weight-bold">New Arrivals</h4>
      </div>
      <ProductSeries sort="createdAt" order="desc" limit={3} />

      <div className="container">
        <h4 className="p-3 mb-5 display-4 font-weight-bold">Best Seller</h4>
      </div>
      <ProductSeries sort="sold" order="desc" limit={3} />
    </>
  );
};

export default Home;
