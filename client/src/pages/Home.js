import ProductSeries from "../components/home/ProductSeries";

const Home = () => {
  return (
    <>
      <h4 className="text-center p-3 mb-5 display-3">New Arrivals</h4>
      <ProductSeries sort="createdAt" order="desc" limit={3} />

      <h4 className="text-center p-3 mb-5 display-3">Best Seller</h4>
      <ProductSeries sort="sold" order="desc" limit={3} />
    </>
  );
};

export default Home;
