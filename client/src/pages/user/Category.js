import CategoryList from "../../components/category/CategoryList";
import SubList from "../../components/subcategory/SubList";
const Home = () => {
  return (
    <>
      <h4 className="text-center p-3 mb-5 display-3">Category</h4>
      <CategoryList />
      <h4 className="text-center p-3 mb-5 mt-5 display-3">Sub Category</h4>
      <SubList />
    </>
  );
};

export default Home;
